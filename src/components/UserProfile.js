import * as React from 'react';
import styles from '../styles/components/UserProfile.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserProfile({ user }) {
  return (
    <div className={styles.userProfileContainer}>
        <AccountCircleIcon style={{ fontSize: 40 }} className={styles.userImage} />
        <div className={styles.userInfo}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
        </div>
        <button className={styles.notificationButton}>
            <img src="/notificacao.svg" alt="Notificações"/>
        </button>
    </div>
  );
}
