import React, { Component } from 'react';
import {Grid, Row, FormControl, Button} from 'react-bootstrap';
import axios from 'axios'

class Phrase extends Component {
    constructor(props){
        super(props);
        this.state = {
            phrases: ["asdaaaa5", "sdadsadda"],
            text: ""
        }

        this.httpUrl = "http://127.0.0.1:1337/";
        this.getPhrases();
    }

    getPhrases(){
        axios.get(this.httpUrl + "phrases").then(res => {
            var list = res.data.phrases;
            this.setState({phrases: list});
        })
    }

    send(){
        var toSend = this.state.text;
        this.setState({text: ""});
        axios.get(this.httpUrl + "phrase", {params: {phrase: toSend}}).then(res => {
            var newPhrases = this.state.phrases.concat([toSend]);
            this.setState({phrases: newPhrases});
        }).catch(error => {
            alert("Error");
        });
    }

    handleChange(e){
        this.setState({text: e.target.value});
    }

    render(){
        var list = this.state.phrases.map((p, i) => <li key={i}>{p}</li>);
        return(
            <Grid>
                <Row>
                    <h1>PhraserMindo</h1>
                    <ul>
                        {list}
                    </ul>
                    <FormControl type="text" value={this.state.text} onChange={(e) => this.handleChange(e)}/>
                    <Button onClick={() => this.send()}>Send</Button>

                </Row>
            </Grid>
        );
    }
}

export default Phrase;