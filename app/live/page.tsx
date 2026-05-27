'use client'
import Image from "next/image";
import TwitchEmbed from "./TwitchEmbed";
import MainTwitchEmbed from "./MainTwitchEmbed"
import MainTeamBanner from "./MainTeamBanner";
import TeamBanner from "./TeamBanner"
import Teams from "./data/teams_new.json"
import { Suspense, useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams, useRouter } from 'next/navigation'

export default function Live() {

    const params = useSearchParams();
    console.log("search params: " + params.get("main"))
    const main = Number(params.get("main"))
    const main_team = Teams.find((team) => team.team_number == main)
    const [currRuns, setCurrRuns] = useState([1, 1, 1, 1, 1, 1, 1, 1])
    const sub_streams = Teams.map((team) => {
        return (<TwitchEmbed team={team}
                             main={main}
                             currRun={team.schedule.run_order[currRuns[team.team_number - 1] - 1]} 
                             key={`team-${team.team_number}-mini`}/>
        )
    })

    const banners = Teams.map((team) =>{
            return <TeamBanner main={main}
                        team={team} 
                        currRun={team.schedule.run_order[currRuns[team.team_number - 1] - 1]} 
                        key={`team-${team.team_number}-banner`}
                        />
    })

    const router = useRouter()
    const rate = 7.5; // The rate at which streams rotate in minutes, and the rate at which info in the main team banner rotates in seconds.
    const [time, setTime] = useState(main);
    const [info, setInfo] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
            router.replace('/live?main=' + ((time % 8) + 1))
            console.log("Time: " + time)
        }, 1000 * 60 * rate);

        return () => {
            clearInterval(interval);
        };
    }, [time])

    useEffect(() => {
        const interval = setInterval(() => {
            setInfo(prevTime => prevTime + 1);
        }, 1000 * rate);

        return () => {
            clearInterval(interval);
        };
    }, [time])

    return (
    <Suspense fallback={<div className="flex flex-col gap-[32px] row-start-2 items-center"><Image className="m-4" src="/logos/1545.png" alt="1545 logo" width={1000} height={1000} priority/></div>}>
        <Container className="page-feed" fluid>
            <Row className="flex m-4">
                <Col className="m-4 border-8" style={{borderColor:"transparent"}}>
                    {banners}
                </Col>
                <Col className={`m-4 main-stream border-8 ${main_team?.team_color} flex`} key={`${main_team?.team_color}-video-main`}>
                    <MainTwitchEmbed main={main_team} currRun={Teams[main - 1].schedule.run_order[currRuns[Teams[main - 1].team_number - 1] - 1]} />
                    </Col>
                <Col className={`m-4 border-8 ${main_team?.team_color} flex`} key={`${main_team?.team_name} stats`}>
                    <MainTeamBanner main={main_team} currRun={Teams[main - 1].schedule.run_order[currRuns[Teams[main - 1].team_number - 1] - 1]} runsCompleted={currRuns[Teams[main - 1].team_number - 1] - 1} info={info}/>
                </Col>
            </Row>
            <Row className="my-40 flex flex-wrap sub-streams justify-center gap-36">
                {sub_streams.slice(0, 4)}
            </Row>
            <Row className="my-40 flex flex-wrap sub-streams items-center justify-center gap-36">
                {sub_streams.slice(-4)}
            </Row>
        </Container>
    </Suspense>
    )
}