import { FC, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import Footer from './Header';
import ConnectWallet from './ConnectWallet';
import cloud from './cloudleft.png';
import cloudr from './cloudright.png';
import dragon from './dragonbell.png';
import discord from './discord.png';
import medium from './medium.png';
import opensea from './opensea.png';
import coinm from './coinm.png';
import etherscan from './etherscan.png';
import Positions from 'pages/Positions';
import Mint from 'pages/Mint';
import StakeModal from 'modals/StakeModal';
import UnstakeModal from 'modals/UnstakeModal';
import WithdrawModal from 'modals/WithdrawModal';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '960px',
    margin: '0 auto',
    padding: '100px 0 30px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '70px 0 10px',
      width: 'auto',
    },
    '& a, a:visited': {
      color: theme.palette.secondary.main,
    },
    '& .MuiInputLabel-shrink': {
      right: 0,
      transform: 'translate(0, 1.5px) scale(1)',
      transformOrigin: 'top left',
      fontSize: 21,
    },
  },
}));

const Layout: FC = () => {
  const classes = useStyles();
  const parallax = useRef<IParallax>(null!);

  return (
    <Router>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: 'url(background.png)',
            backgroundSize: 'cover',
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: 'url(backgroundL.png)',
            backgroundSize: 'cover',
            opacity: '1',
            bottom: '0',
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={0.2}
          factor={3}
          style={{
            backgroundImage: 'url(backgroundL1.png)',
            backgroundSize: 'cover',
            opacity: '0.1',
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={0.2}
          factor={3}
          style={{
            backgroundImage: 'url(backgroundL2.png)',
            backgroundSize: 'cover',
            opacity: '0.1',
          }}
        />

        <ParallaxLayer
          offset={0.72}
          speed={0.3}
          style={{ pointerEvents: 'none' }}
        >
          <img
            src={cloud}
            alt='cloud'
            style={{ width: '45%', right: '-10vm' }}
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.9}
          speed={0.5}
          style={{ pointerEvents: 'none' }}
        >
          <img
            src={cloudr}
            alt='cloud'
            style={{ width: '69%', marginLeft: '35%' }}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.1}>
          <img
            src={dragon}
            alt='cloud'
            style={{ width: '73%', marginLeft: '15%' }}
          />
        </ParallaxLayer>

        <Box className={classes.container}>
          <ParallaxLayer offset={1.1} speed={0.3}>
            <Mint />
          </ParallaxLayer>
          <ParallaxLayer offset={2.2} speed={0.2}>
            <div style={{ fontSize: '5rem', color: '#332B1C' }}>
              The Tale continues...
            </div>

            <Positions />
          </ParallaxLayer>
          <Switch>
            <Route path={'/stake/:tokenId'} component={StakeModal} />
            <Route path={'/unstake/:tokenId'} component={UnstakeModal} />
            <Route path={'/withdraw/:tokenId'} component={WithdrawModal} />
          </Switch>

          <ConnectWallet />
          <ParallaxLayer offset={2.7} speed={0.2}>
            <Box
              className={classes.container}
              style={{
                display: 'flex',
                flexDirection: 'row',
                bottom: '0',
                width: '100%',
                fontSize: '1rem',
                color: '#332B1C',
              }}
            >
              <img
                src={etherscan}
                alt='eth'
                style={{ width: '3%', right: '-10vm' }}
              />
              <img
                src={discord}
                alt='cloud'
                style={{ width: '3%', right: '-10vm' }}
              />
              <img
                src={medium}
                alt='cloud'
                style={{ width: '3%', right: '-10vm' }}
              />
              <img
                src={opensea}
                alt='cloud'
                style={{ width: '3%', right: '-10vm' }}
              />
              <img
                src={coinm}
                alt='cloud'
                style={{ width: '3%', right: '-10vm' }}
              />
            </Box>
            <div
              style={{
                border: 'none',
                borderTop: '2px dotted #332B1C',
                color: '#332B1C',
                backgroundColor: 'none',
                height: '1px',
                width: '100%',
              }}
            />
            <div
              style={{
                border: 'none',
                borderTop: '2px #332B1C',

                backgroundColor: 'none',
                height: '1px',
                width: '100%',
                fontSize: '1rem',
                color: '#332B1C',
              }}
            >
              {' '}
              <p className='copyright-text'>
                Copyright &copy; 2023 All Rights Reserved by
                <a href='#'> DojojiBell</a>.
              </p>
            </div>
          </ParallaxLayer>
        </Box>
      </Parallax>
    </Router>
  );
};

export default Layout;
