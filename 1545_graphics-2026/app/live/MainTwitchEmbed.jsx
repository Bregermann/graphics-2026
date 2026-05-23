import { Container, Row, Col } from "reactstrap"
import RunnerInfo from "./data/runnerinfo_new.json"
import MainTeamBanner from "./MainTeamBanner";

const MainTwitchEmbed = ({ main, currRun}) => {

    const name = main.schedule.runs[currRun].name;
    const width = 1920;
    const height = 1080;
    let src = "https://player.twitch.tv/?channel=" + main.schedule.runs[currRun].name + "&parent=localhost&muted=false";
    const twitch = RunnerInfo.find((runner) => runner.name == name).twitch;
    if (twitch) {
        src = "https://player.twitch.tv/?channel=" + twitch + "&parent=localhost&autoplay=true&muted=true";
    }

    return (
            <Container className="flex">
                <Row className="p-2 m-2 main-stream">
                    <Col className={`border-4 ${main.team_color}`} key={main.name}>
                        <iframe src={src} height={height*2.05} width={width*1.61} />
                    </Col>
                </Row>
                <Row>
                    <MainTeamBanner team={main} currRun={currRun}/>
                </Row>
            </Container>
    )
};

export default MainTwitchEmbed;