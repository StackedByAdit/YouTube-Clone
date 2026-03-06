import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod/v4";
import { prisma } from "./db";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl, S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { Gender } from "./generated/prisma/enums";

const R2_URL = "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_ACCESS_SECRET = process.env.R2_ACCESS_SECRET!;

const S3 = new S3Client({
  region: "auto",
  endpoint: R2_URL,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_ACCESS_SECRET,
  },
});

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "secretKey123456@";

function getUserId(req: express.Request): string | null {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET) as { userId: string };
    return payload.userId;
  } catch {
    return null;
  }
}

const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  gender: z.nativeEnum(Gender),
  channelName: z.string().min(1),
});

const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const uploadSchema = z.object({
  videoUrl: z.url(),
  thumbnailUrl: z.url(),
  userId: z.string()
});

// type SignupInput = z.infer<typeof signupSchema>;

app.post("/api/signup", async (req, res) => {

  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const { username, password, gender, channelName } = parsed.data;

  const existing = await prisma.user.findFirst({ where: { username } });

  if (existing) { res.status(409).json({ error: "Username already taken" }); return; }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, password: hashedPassword, gender, channelName }
  });

  res.status(201).json({ message: "User created successfully" });
});

app.post("/api/signin", async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const { username, password } = parsed.data;

  const user = await prisma.user.findFirst({ where: { username } });
  if (!user) { res.status(401).json({ error: "Invalid credentials" }); return; }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) { res.status(401).json({ error: "Invalid credentials" }); return; }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token, userId: user.id });
});

app.get("/api/videos", async (_req, res) => {
  const videos = await prisma.uploads.findMany({
    include: { user: { select: { id: true, channelName: true, profilePicture: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(videos);
});

app.get("/api/videos/:id", async (req, res) => {
  const video = await prisma.uploads.findUnique({
    where: { id: req.params.id },
    include: { user: { select: { id: true, channelName: true, profilePicture: true, subscriberCount: true } } },
  });[]
  if (!video) { res.status(404).json({ error: "Video not found" }); return; }
  res.json(video);
});

app.post("/api/videos", async (req, res) => {
  const userId = getUserId(req);
  if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const parsed = uploadSchema.safeParse(req.body);

  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const { videoUrl, thumbnailUrl } = parsed.data

  const video = await prisma.uploads.create({
    data: { videoUrl, thumbnailUrl, userId }
  });
  res.status(201).json(video);
});


app.get("/channel/:username", async (req, res) => {
  const username = req.params.username;

  // we need channelDetails of a user and all his videos

  const channelDetails = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  if (!channelDetails) {
    res.status(403).json({
      error: "a channel with that username does not exists"
    })
    return
  }

  const userVideos = await prisma.uploads.findMany({
    where: {
      userId: channelDetails?.id
    }
  })
  res.json({
    channelDetails,
    userVideos
  })
})


app.get("/api/search", async (req, res) => {
  const query = req.query.q as string;

  if (!query || query.trim() === "") {
    return res.json([]);
  }

  try {
    const videos = await prisma.uploads.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        user: {
          select: {
            channelName: true,
            profilePicture: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});


app.post("/getPresignedUrl", async (req, res) => {

  const videoPath = "Aditya/videos/" + Math.random() + ".mp4"; //future cloudflare bucket video location

  const putUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: "youtube-100xdevs",
      Key: videoPath,
      ContentType: "video/mp4",
    }),
    { expiresIn: 3600 },
  );

  res.json({
    putUrl,
    finalVideoUrl: "https://pub-9ed79a211b484b3f819c6f0883e7ac3e.r2.dev/" + videoPath
  })

})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});