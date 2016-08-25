import React from 'react';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import Spinner from '../Spinner';
import Error from '../Error';
import { REDUCER_KEY, player } from '../../reducers';
import { getPlayer } from '../../actions';
import styles from './AccountWidget.css';
import { Link, withRouter } from 'react-router';
import { API_HOST } from '../../config';
// import FontIcon from 'material-ui/FontIcon';
// import { PlayerPicture } from '../Player';

// Maybe we can factor out this ternary into a function?
/*
        <PlayerPicture noSteamLink link={`/players/${user.account_id}/overview`} playerId={user.account_id} />
        <FontIcon style={{ fontSize: 40 }} className="material-icons">
          exit_to_app
        </FontIcon>
*/
const profileLink = (path, router) => {
  router.push(path);
};

const AccountWidget = ({ router, loading, error, user  }) => (
  <div className={styles.container}>
    {loading && !error && <Spinner />}
    {error && <Error />}
    {!error && !loading && user ? (
      <div className={`${styles.flexContainer} ${styles.tab}`}>
        <Avatar src={''} size={35} />
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem onClick={() => profileLink(`/players/${user.account_id}`, router) } primaryText="My Profile" />
          <MenuItem href={`${API_HOST}/logout`} primaryText="Logout" />
        </IconMenu>
      </div>
    )
    : <a href={`${API_HOST}/login`}>Login</a>
    }
  </div>
);

export { AccountWidget };

const mapStateToProps = (state) => {
  const { error, loading, user } = state[REDUCER_KEY].gotMetadata;
  
  return {
    loading,
    error,
    user,
  };
};

export default connect(mapStateToProps)(withRouter(AccountWidget));
