export const onGetWebSocketConnection  =(setSocket) => {
    const ws = new WebSocket("wss://compiler.skillshikshya.com/ws/compiler/");
    setSocket(ws);
    
    ws.onerror = (err) => {
        console.error("WebSocket error:", err);
    };
 
    return () => ws.close();

}