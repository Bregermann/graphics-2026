import {Col, Row} from "react-bootstrap";
import RunnerInfo from "./data/runnerinfo_new.json"

const TwitchEmbed = ({team, currRun}) => {

        const name = team.schedule.runs[currRun].name;
        let src = "https://player.twitch.tv/?channel=" + team.schedule.runs[currRun].name + "&parent=localhost&autoplay=true&muted=true";
        const twitch = RunnerInfo.find((runner) => runner.name == name).twitch;
        if (twitch) {
            src = "https://player.twitch.tv/?channel=" + twitch + "&parent=localhost&autoplay=true&muted=true";
        }

        return (
            <Row key={team.team_name}>
                <Col className={`border flex-col ${team.team_color} p-2`}>
                    <iframe src={src} height={360} width={640}/>
                </Col>
            </Row>
        )
};

export default TwitchEmbed;