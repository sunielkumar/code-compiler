
import React, { useState, useEffect } from "react";
import { Button, Input, Select, Typography, Row, Col, notification } from "antd";
import { IoPlayOutline } from "react-icons/io5";
import { IoStopOutline } from "react-icons/io5";
import './compiler.css'
import { onGetWebSocketConnection } from "../../redux/actions/compilerAction";

const CodeCompiler = () => {
   
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [socket, setSocket] = useState(null);
    

    // useEffect(() => {
    //     // Connect to WebSocket when the component mounts
    //     const ws = new WebSocket("wss://compiler.skillshikshya.com/ws/compiler/");
    //     setSocket(ws);

    //     ws.onerror = (err) => {
    //         console.error("WebSocket error:", err);
    //     };

    //     // Cleanup WebSocket on unmount
    //     return () => ws.close();
    // }, []);

    useEffect(() => {
    const cleanup = onGetWebSocketConnection(setSocket)

    return cleanup;
    }, [])
    

    const onChangeCode = (e) => {
        setCode(e.target.value)
    }

    const onChangeProgrammingLanguage = (value) => {
        setLanguage(value)
    }
    const onChangeInput = (e) => {
        setInput(e.target.value)
    }

    const handleRun = () => {
        if (!code.trim()) {
            notification.error({
                message: 'Error',
                description: 'Please write some code before running!',
            });
            return;
        }
        if (socket) {
            setOutput("");
           
            const payload = {
                command: "run",
                code,
                language,
                input,
            };
            socket.send(JSON.stringify(payload));

            if (input) {
                handleInput(input);
            }

            notification.success({
                message: 'Code Execution Complete',
                description: 'Your code executed successfully!',
              });
              
        }
    };

    const handleStop = () => {
        if (socket) {
            const payload = { command: "stop" };
            socket.send(JSON.stringify(payload));

            notification.success({
                message: 'Code Stopped',
                description: 'Your code has been stopped.',
            });
        }
    };

    const handleInput = (newInput) => {
        if (socket) {
            const payload = { command: "input", input: newInput };
            socket.send(JSON.stringify(payload));
        }
    };

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === "stdout") {
                    setOutput((prev) => prev + message.data);
                }

                if (message.type === "stderr") {
                    // If there is an error
                    setOutput((prev) => prev + message.data);
                    notification.error({
                        message: 'Code Execution Failed',
                        description: message.data,  // Error description from WebSocket
                    });
                    
                }

                
            };
        }
    }, [socket]);

    return (

        <Row gutter={[16, 16]} justify='center'>
            <Col lg={18} xs={18} span={24}>
                <Typography.Title level={2}>Code Compiler</Typography.Title>
                <Typography.Text style={{ fontSize: 16 }}> Select a Language</Typography.Text> <br />
                <Select
                    allowClear
                    placeholder="Select a Language"
                    value={language}
                    onChange={onChangeProgrammingLanguage}

                    style={{ width: '30%' , margin:'8px 0px'}}
                    options={[
                        { label: 'JavaScript', value: 'javascript' },
                        { label: 'Python', value: 'python' }
                    ]}
                />
                <Input.TextArea
                    rows={12}
                    value={code}
                    onChange={onChangeCode}
                    placeholder="Write your code here..."
                   
                />

                <Row style={{ margin: '20px 0px' }}>
                    <Col lg={24} xs={24} span={24}>
                        <Input.TextArea
                            rows={4}
                            value={input}
                            onChange={onChangeInput}
                            placeholder="Input (optional)"
                        />
                    </Col>
                </Row>

                <Row justify='end'>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                        <Button
                            type="primary"
                            icon={<IoPlayOutline size={14} />}
                            style={{
                                marginRight: 12, marginRight: 12,
                                backgroundColor: '#333486',
                                borderColor: '#333486'
                            }}
                            onClick={handleRun}
                            
                            >
                            Run
                        </Button>
                        <Button type="primary" danger icon={<IoStopOutline size={14} />} onClick={handleStop}>Stop</Button>
                    </Col>
                </Row>

                <Typography.Title level={4}> Output:</Typography.Title>
                <div className="output-box">
                    {output}
                </div>
            </Col>
        </Row>

    );
};

export default CodeCompiler;