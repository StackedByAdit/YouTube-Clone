import axios from "axios"
import { useState } from "react";

export function Upload() {
    const [videoUrl, setVideoUrl] = useState("")
    const [thumbnailUrl, setThumbnailUrl] = useState("")

    return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <div style={{ padding: 20, marginTop: "20vh" }}>
            <input type="file" onChange={async (e) => {
                const file = e.target.files![0];
                console.log(file);

                const response = await axios.post("http://localhost:3000/getPresignedUrl")
                const { putUrl, finalVideoUrl } = response.data;

                const options = {
                    method: 'PUT',
                    url: putUrl,
                    headers: { 'Content-Type': file.type },
                    data: file
                };

                await axios.request(options);
                setVideoUrl(finalVideoUrl);

                alert("video uploaded")
            }}>

            </input>
        </div>
        <div style={{ padding: 20 }}>
            <input type="file" placeholder="choose thumbnail" onChange={async (e, files) => {
                const file = e.target.files[0];
                console.log(file);

                const response = await axios.post("http://localhost:3000/getPresignedUrl")
                const { putUrl, finalVideoUrl } = response.data;

                const options = {
                    method: 'PUT',
                    url: putUrl,
                    headers: { 'Content-Type': file.type },
                    data: file
                };

                await axios.request(options);
                setThumbnailUrl(finalVideoUrl);

                alert("video upload done")
            }}></input>
        </div>
        <button style={{ padding: 20 }} onClick={() => {
            if (!videoUrl) {
                alert("video not uploaded yet")
                return
            }
            axios.post("http://localhost:3000/api/videos", {
                videoUrl,
                thumbnailUrl
            })
        }}>Upload files</button>
    </div>
}