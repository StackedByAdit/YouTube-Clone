import axios from "axios"
import type { S } from "node_modules/react-router/dist/development/router-5iOvts3c.d.mts"
import { useEffect } from "react"


export function Landing() {

    // useEffect(() => {
    //     axios.get("http://localhost:3000/api/vidoes")
    // }, [])

    return (
        <div style={{display:"flex", gap: 10}}>
            <div style={{ display: "flex" }}>
                <VideoCard
                    thumbnailUrl="https://imgs.search.brave.com/sPyQrAFZvrVU6ugGsf0FK6MwPmSDboLuORJ6ms2gAqM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9EQTNabUpp/WXpRdE9HWXdOeTAw/WkdRekxXRTJPR010/TkdaaVpqZzBOV05o/T0RjMVhrRXlYa0Zx/Y0dkZVFXUnBaV2R0/YjI1bi5fVjFfUUw3/NV9VWDUwMF9DUjAs/MCw1MDAsMjgxXy5q/cGc"
                    title="Shinobu vs Douma || Demon Slayer Infnity Castle the Movie"
                    profilePicture="https://avatars.githubusercontent.com/u/215988621?v=4"
                    channelName="Demon Slayer"
                />
            </div>

            <div style={{ display: "flex" }}>
                <VideoCard
                    thumbnailUrl="https://imgs.search.brave.com/sPyQrAFZvrVU6ugGsf0FK6MwPmSDboLuORJ6ms2gAqM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9EQTNabUpp/WXpRdE9HWXdOeTAw/WkdRekxXRTJPR010/TkdaaVpqZzBOV05o/T0RjMVhrRXlYa0Zx/Y0dkZVFXUnBaV2R0/YjI1bi5fVjFfUUw3/NV9VWDUwMF9DUjAs/MCw1MDAsMjgxXy5q/cGc"
                    title="Shinobu vs Douma || Demon Slayer Infnity Castle the Movie"
                    profilePicture="https://avatars.githubusercontent.com/u/215988621?v=4"
                    channelName="Demon Slayer"
                />
            </div>

            <div style={{ display: "flex" }}>
                <VideoCard
                    thumbnailUrl="https://imgs.search.brave.com/sPyQrAFZvrVU6ugGsf0FK6MwPmSDboLuORJ6ms2gAqM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9EQTNabUpp/WXpRdE9HWXdOeTAw/WkdRekxXRTJPR010/TkdaaVpqZzBOV05o/T0RjMVhrRXlYa0Zx/Y0dkZVFXUnBaV2R0/YjI1bi5fVjFfUUw3/NV9VWDUwMF9DUjAs/MCw1MDAsMjgxXy5q/cGc"
                    title="Shinobu vs Douma || Demon Slayer Infnity Castle the Movie"
                    profilePicture="https://avatars.githubusercontent.com/u/215988621?v=4"
                    channelName="Demon Slayer"
                />
            </div>
        </div>


    )
}

interface VideoDetails {
    profilePicture: string
    title: string
    channelName: string
    thumbnailUrl: string
}

function VideoCard({ profilePicture, channelName, title, thumbnailUrl }: VideoDetails) {
    return (
        <div style={{ width: 320, cursor: "pointer" }}>

            <img
                src={thumbnailUrl}
                style={{
                    width: "100%",
                    borderRadius: 12,
                    display: "block"
                }}
            />

            <div style={{ display: "flex", marginTop: 12 }}>

                <img
                    src={profilePicture}
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        marginRight: 12
                    }}
                />

                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>

                    <div style={{ fontWeight: 500, fontSize: 16, lineHeight: "20px" }}>
                        {title}
                    </div>

                    <div style={{ color: "#606060", fontSize: 14, marginTop: 4 }}>
                        {channelName}
                    </div>

                </div>
            </div>
        </div>
    );
}