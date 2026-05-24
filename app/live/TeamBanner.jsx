import Games from "./data/games.json"
import RunnerInfo from "./data/runnerinfo_new.json"
import {Container, Row, Col} from "reactstrap"
import Image from "next/image"
import "./TeamBanner.css"

const TeamBanner = ({team, currRun, main}) => {

        const name = team.schedule.runs[currRun].name;
        const pronouns = RunnerInfo.find((runner) => runner.name == name).pronouns;

        return (
                <Container style={{display:'flex', position:'relative'}}>
                <Row className={`border ${team.team_number === main ? "main": ""} m-2 p-3 ` + team.team_color + '-banner'}
                     key={team.team_name}
                     style={{width:1400, height:265}}>
                    <Col>
                        <Image className={team.team_color + ' curr-game'} 
                            src={'/logos/' + Games[currRun][1] + '.png'} 
                            alt='Current game logo'
                            key={`team-${team.team_number}`}
                            id={Games[currRun][1]}
                            width={350} height={350}
                            style={{objectFit: 'cover', float: 'left', width:'20%', margin:'50px', display:'block'}} />
                    </Col>
                    <Col>
                        <h5>{team.team_name}</h5>
                        <h4>{name}</h4>
                        <h3> {pronouns} </h3>
                    </Col>

                </Row>
                </Container>

        )
};

export default TeamBanner;