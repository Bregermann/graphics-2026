import Games from "./data/games.json"
import RunnerInfo from "./data/runnerinfo_new.json"
import {Container, Row, Col} from "react-bootstrap"
import Image from "next/image"
import "./MainTeamBanner.css"

const MainTeamBanner = ({team, currRun}) => {

        const name = team.schedule.runs[currRun].name;
        console.log(team.schedule)
        let pronouns = RunnerInfo.find((runner) => runner.name == name).pronouns;
        if (pronouns === "") {
            pronouns = "None"
        }
        const pb = "1:23:45"
        let width = 0

        const gamesCompleted = Games.map((game) => {
                let src = "/logos/" + game[1] + ".png";
                if (game[0].includes('Mario')) {
                    width = 240
                } else {
                    width = 330
                }
                return <div className={'mb-4 pt-10 ' + team.team_color}><Image src={src} width={width} height={width} className={currRun > Games.indexOf(game) ? "complete" : currRun == Games.indexOf(game) ? "in-progress" : "incomplete"}></Image></div>
            }
    )

        return (
                <Row className={`p-4 m-4 main-banner border-4 ` + team.team_color + '-banner ' + team.team_color}
                     key={team.team_name}
               >
                    <Col>
                        <Image className={team.team_color + ' curr-game'} 
                            src={'/logos/' + Games[currRun][1] + '.png'} 
                            alt='Current game logo'
                            key={`team-${team.team_number}`}
                            id={Games[currRun][1]}
                            width={300} height={300}
                            style={{objectFit: 'contain', margin:'50px'}} />
                    </Col>
                    <Col className="main-text">
                        <h5>{team.team_name}</h5>
                        <h4>{name}</h4>
                        <h3 className={pronouns === 'None' ? 'no-pronouns' : 'pronouns'}>{pronouns}</h3>
                    </Col>
                    <footer className="row-start-4 flex gap-[32px] pb-16 flex-wrap items-center justify-center">
                        {gamesCompleted}
                    </footer>

                </Row>

        )
};

export default MainTeamBanner;