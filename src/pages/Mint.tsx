import { FC, useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import * as ethers from 'ethers';
import { Box, Paper } from '@material-ui/core';
import { positions } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';
import dragon from './dragon.png';
import bell from './bell.gif';
import { useWallet } from 'contexts/wallet';
import { useContracts } from 'contexts/contracts';
import { useNotifications } from 'contexts/notifications';
import { useData } from 'contexts/data';
import { LiquidityPosition } from 'utils/types';
import { formatUnits } from 'utils/big-number';

export const useStyles = makeStyles((theme) => ({
  maxButton: {
    height: 35,
  },
  depositButtonCell: {
    width: 110,
    padding: 5,
  },
  depositButton: {
    width: 100,
  },
}));

const Mint: FC<{ history: any }> = ({ history }) => {
  const classes = useStyles();
  const { nftManagerPositionsContract } = useContracts();
  const {
    startConnecting: startConnectingWallet,
    address,
    signer,
  } = useWallet();
  const {
    token0Address,
    token1Address,
    token0Symbol,
    token1Symbol,
  } = useContracts();
  const {
    positions,
    currentIncentiveId,
    incentives,
    setCurrentIncentiveId,
  } = useData();

  const isholder = async () => {
    if (!nftManagerPositionsContract) return false;
    const [balance] = await Promise.all([
      nftManagerPositionsContract.balanceof(address),
    ]);
    if (balance > 0) return true;
    else return false;
  };
  const mintBell = async () => {
    if (!nftManagerPositionsContract) return;
    const [minting] = await Promise.all([
      nftManagerPositionsContract.getApproved(address, {
        value: ethers.utils.parseEther('0.015'),
      }),
    ]);
  };
  return (
    <>
      <div style={{ fontSize: '5rem', color: '#332B1C' }}>
        The Tale <a style={{ color: '#873340' }}>Begins </a>
      </div>
      <div style={{ fontSize: '1.3rem', marginLeft: '3%', marginTop: '5%' }}>
        The Bell of Dojoji is a tale that must be written on the Blockchain to
        live it's glory for the future generations!
        <p>
          A{' '}
          <a style={{ fontSize: '1.4rem', color: '#332B1C' }}>
            trustless contract
          </a>{' '}
          has been deployed where each mint will ring the Bell...
        </p>
        <p>
          Upon reaching MaxSupply of 777 Bells the trading of{' '}
          <a style={{ fontSize: '1.4rem', color: '#332B1C' }}>$DOJOJI</a> begins
          and its full glory shall be unleashed!
        </p>
        <p>
          Maximum of{' '}
          <a style={{ fontSize: '1.4rem', color: '#332B1C' }}>1 Bell/wallet</a>{' '}
          at the fair price of{' '}
          <a style={{ fontSize: '1.4rem', color: '#873340' }}>0.015ETH </a>
          to avoid jeets and botting to trigger the launch!
        </p>
        <p>
          The Lucky Original Ringers holders will have 0% tax privileges on the
          token and a few surprizes for the longrun...{' '}
        </p>
      </div>
      <Box
        m={5}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',

          marginLeft: '0',
          marginTop: '10%',
        }}
      >
        <Paper
          style={{
            backgroundImage: 'url(bellbackground.png)',
            backgroundSize: 'cover',
            position: 'relative',
            width: '33%',
            marginRight: '5%',
          }}
        >
          <Box display={'flex'} flexDirection={'column'}>
            <Box>
              <img
                src={bell}
                alt='cloud'
                style={{
                  position: 'relative',
                  width: '100%',
                  left: '1.5vmin',
                  top: '7vmin',
                }}
              />
            </Box>
            <div></div>
          </Box>
        </Paper>

        <Box>
          <div
            style={{ fontSize: '1.3rem', marginLeft: '3%', marginTop: '3%' }}
          >
            With each Ring of the Bell we become stronger and closer to the
            release of{' '}
            <a style={{ fontSize: '1.4rem', color: '#332B1C' }}>$DOJOJI</a>
            <p>
              Don't be{' '}
              <a style={{ fontSize: '1.4rem', color: '#873340' }}> Greedy </a>in
              the mint... the purpose is to create a strong and united community
              of Chads ready to make this fly!
            </p>
            <p>
              {' '}
              <a style={{ fontSize: '4.4rem', color: '#873340' }}>0/777</a>
              <a style={{ fontSize: '3.4rem', color: '#FFFFF' }}> Bells Rung</a>
            </p>
            <Button
              color='secondary'
              variant='contained'
              onClick={mintBell}
              className={classes.depositButton}
              style={{
                display: 'flex',
                fontSize: '1.1rem',
                width: '33%',
              }}
            >
              {' '}
              <div>Mint {'&'} Ring </div>
            </Button>{' '}
            <p>
              {' '}
              <a style={{ fontSize: '1.4rem', color: '#873340' }}>
                WARNING!
              </a>{' '}
              Bots WILL get REKT!{' '}
              <a style={{ fontSize: '1.4rem', color: '#873340' }}>WARNING!</a>
            </p>
          </div>
        </Box>
      </Box>
    </>
  );
};

function formatTimestamp(unix: number) {
  return moment.unix(unix).local().format('YYYY-MM-DD HHmm[h]');
}

export default withRouter(Mint);
