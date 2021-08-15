import React from 'react';
import Typist from 'react-text-typist';
import { Content } from 'rsuite';

class HomePage extends React.Component {
    render() {
        return (
            <Content className="Banner-Header">
                <Typist
                    sentences={[
                    'Introducing the Ledn Token Insights platform 📈',
                    'This is a web3 application powered by the InterPlanetary File System 🌎',
                    'Please begin by connecting your MetaMask Wallet 🦊']}
                    typingSpeed={15}
                    deletingSpeed={13}
                    cursorColor='#1e8ae3'
                    cursorBlinkSpeed='500'
                    pauseTime={2500}
                    loop={!false}
                />
            </Content>
        )
    }
}

export default HomePage;