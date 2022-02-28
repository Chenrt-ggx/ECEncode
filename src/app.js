import './app.css';
import React from 'react';
import {encode, decode, random} from './main.js';
import {Button, Input, Row, Col, Divider} from 'antd';

const {TextArea} = Input;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '',
            dst: ''
        };
    }

    onEncode = (e) => {
        e.preventDefault()
        this.setState({
            dst: encode(this.state.src)
        })
    }

    onDecode = (e) => {
        e.preventDefault()
        this.setState({
            src: decode(this.state.dst)
        })
    }

    onRandom = (e) => {
        e.preventDefault()
        let gen = random(1 << 4)
        this.setState({
            src: gen
        })
        this.setState({
            dst: encode(gen)
        })
    }

    render() {
        return (
            <Row justify="center">
                <Col span={16}>
                    <Row className="title" justify="center">
                        EC Encode
                    </Row>
                    <Row className="paragraph" justify="center">
                        Excellent Course Encode: Encode text by using names of some excellent courses in BUAA<br/>
                        Open Source on Github
                    </Row>
                    <Row justify="center">
                        <TextArea rows={9} className="text" allowClear value={this.state.src}
                                  onChange={(event) =>
                                      this.setState({
                                          src: event.target.value
                                      })}/>
                    </Row>
                    <Divider/>
                    <Row justify="center">
                        <Col span={4}>
                            <Button type="primary" size={"large"} block onClick={this.onEncode}>
                                Encode
                            </Button>
                        </Col>
                        <Col span={4} offset={4}>
                            <Button type="primary" size={"large"} block onClick={this.onDecode}>
                                Decode
                            </Button>
                        </Col>
                        <Col span={4} offset={4}>
                            <Button type="primary" size={"large"} block onClick={this.onRandom}>
                                Random
                            </Button>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row justify="center">
                        <TextArea rows={9} className="text" allowClear value={this.state.dst}
                                  onChange={(event) =>
                                      this.setState({
                                          dst: event.target.value
                                      })}/>
                    </Row>
                </Col>
            </Row>
        )
    }
}
