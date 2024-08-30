import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';

import DashboardIcon from '/public/dashboard.svg';
import InvestimentosIcon from '/public/investimentos.svg';
import TransacoesIcon from '/public/transacoes.svg';
import OrcamentosIcon from '/public/orcamentos.svg';
import RelatoriosIcon from '/public/relatorios.svg';

import styles from '../styles/components/Sidebar.module.css';
import UserProfile from './UserProfile';

export default function Sidebar() {
    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Investimentos', icon: <InvestimentosIcon />, path: '/investimentos' },
        { text: 'Transações', icon: <TransacoesIcon />, path: '/transacoes' },
        { text: 'Orçamentos', icon: <OrcamentosIcon />, path: '/orcamentos' },
        { text: 'Relatórios', icon: <RelatoriosIcon />, path: '/relatorios' }
    ];

    return (
        <Drawer variant="permanent" className={styles.drawer}>
            <UserProfile user={{ name: 'Fulano Exemplo', email: 'fulano@exemplo.com' }} />
            <List>
                {menuItems.map((item) => (
                    <Link href={item.path} key={item.path} passHref legacyBehavior>
                        <ListItemButton className={styles['list-item-button']} component="a">
                            <ListItemIcon className={styles['list-item-icon']}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{ style: { fontSize: '0.75rem' } }}
                                className={styles['list-item-text']}
                            />
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        </Drawer>
    );
}