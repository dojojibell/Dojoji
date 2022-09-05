import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { useWallet } from 'contexts/wallet';
import { APP_NAME } from 'config';
import coinm from './coinm.png';
import eth from './ETH.png';
import op from './op.png';

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: 'none',
  },
  title: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  account: {
    marginRight: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const {
    address,
    network,
    chainid,
    startConnecting,

    disconnect,
  } = useWallet();

  const shortAddress =
    address && `${address.slice(0, 6)}....${address.slice(-4)}`;

  return (
    <AppBar
      position='sticky'
      color='inherit'
      className={classes.container}
      style={{
        top: 'auto',

        height: '5%',
        background:
          'linear-gradient(180deg, rgba(60,52,38,1) 0%, rgba(0,0,0,1) 86%)',
        boxShadow:
          'inset -5px -5px 9px rgba(0, 0, 0,0.3), inset 5px 5px 9px rgba(60,52,38,0.3)',
      }}
    >
      <Toolbar color='inherit'>
        <Typography variant='h6' className={'flex flex-grow'}>
          <div className={'flex items-center'}>{APP_NAME}</div>
        </Typography>

        {address ? (
          <>
            <div
              className={classes.account}
              style={{
                top: 'auto',
                borderRadius: '25px',
                padding: '1%',

                boxShadow:
                  'inset -5px -5px 9px rgba(0, 0, 0,0.3), inset 5px 5px 9px rgba(162,141,97,0.3)',
              }}
            >
              {shortAddress}
            </div>
            <div className='dropdown'>
              <button className='dropbtn'>
                {chainid === 1 ? (
                  <img src={eth} alt='cloud' style={{ maxWidth: '40px' }} />
                ) : (
                  <img src={op} alt='cloud' style={{ maxWidth: '40px' }} />
                )}
              </button>
              <div className='dropdown-content'>
                {chainid === 1 ? (
                  <img src={op} alt='cloud' style={{ maxWidth: '40px' }} />
                ) : (
                  <img src={eth} alt='cloud' style={{ maxWidth: '40px' }} />
                )}
              </div>
            </div>
            <Button color='secondary' onClick={disconnect}>
              Disconnect
            </Button>
          </>
        ) : (
          <Button color='secondary' onClick={startConnecting}>
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
