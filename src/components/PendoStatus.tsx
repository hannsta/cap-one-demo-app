import React, { useEffect, useState } from 'react';

function PendoStatusMenu() {
  const [pendoReady, setPendoReady] = useState(false);
  const [visitorId, setVisitorId] = useState(null);
  
  useEffect(() => {
    const checkPendo = () => {
      //@ts-ignore
      if (window.pendo){
        //@ts-ignore
        const visitor = window.pendo.getVisitorId?.();

        if (visitor) {
          setPendoReady(true);
          setVisitorId(visitor);
        }
      }
    };

    //Run once initially
    checkPendo();

    //Run every 2 seconds to check connection status
    const interval = setInterval(checkPendo, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 85, left: 10, padding: '10px', background: '#eee', borderRadius: '8px', zIndex: 1000 }}>
      <strong>Pendo Status:</strong><br />
      {pendoReady ? (
        <span style={{ color: 'green' }}>
          ✅ Connected<br />
          Visitor ID: <code>{visitorId}</code>
        </span>
      ) : (
        <span style={{ color: 'red' }}>❌ Not Connected</span>
      )}
    </div>
  );
}

export default PendoStatusMenu;