'use server'
import Image from "next/image";
import TwitchEmbed from "./TwitchEmbed";
import MainTwitchEmbed from "./MainTwitchEmbed"
import TeamBanner from "./TeamBanner"
import Teams from "./data/teams_new.json"
import { Suspense } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { connection } from "next/server";

type SearchParams = {
    searchParams?: Promise<Record<string, string>>
}

export default async function Live({searchParams} : SearchParams) {

    await connection();
    const params = new URLSearchParams(await searchParams);
    
    
    
    console.log("search params: " + params.get("main"))
    const main = Number(params.get("main"))
    const currRuns = [1, 2, 3, 11, 0, 12, 6, 4]
    const teamEmotePaths = [
        '/logos/team_emotes/rusty_bucket_babes.png',
        '/logos/team_emotes/grape_apes.png',
        '/logos/team_emotes/silly_willies.png',
        '/logos/team_emotes/peach_and_co.png',
        '/logos/team_emotes/mintallyinsane.png',
        '/logos/team_emotes/hot.png',
        '/logos/team_emotes/green_tea_m.png',
        '/logos/team_emotes/gaslight.png'
    ]
    const sub_streams = Teams.map((team) => {
        if (team.team_number == main) {
            return (
                    <Row key={team.team_name} className={`border flex ${team.team_color} p-2`}>
                        <Col style={{position: "relative", width: 640, height: 360}}>
                            <Image className={team.team_color} 
                                   src={teamEmotePaths[team.team_number - 1]} 
                                   alt='1545 Team Logo' key={`team-${team.team_number}`} 
                                   fill
                                   style={{objectFit: "contain"}}/>
                        </Col>
                    </Row>
        )}
        return (<TwitchEmbed team={team} 
                             currRun={currRuns[team.team_number - 1]} 
                             key={`team-${team.team_number}`}/>
        )
    })

    const banners = Teams.map((team) =>{
            return <TeamBanner main={main}
                        team={team} 
                        currRun={currRuns[team.team_number - 1]} 
                        key={`team-${team.team_number}-banner`}
                        />
    })

    return (
    <Suspense fallback={<div className="m-4 flex justify-items-center"><Image className="m-4 justify-content" src="/logos/1545.png" alt="1545 logo" width={1000} height={1000} priority/></div>}>
        <Container className="page-feed" fluid>
            <Row className="flex m-6">
                <Col>{banners}</Col>
                <Col><MainTwitchEmbed main={Teams.find((team) => team.team_number == main)} currRun={currRuns[main - 1]} /></Col>
            </Row>
            <Row className="flex grid-flow-row gap-13 m-7 sub-streams">
                {sub_streams}
            </Row>
        </Container>
    </Suspense>
    )
}