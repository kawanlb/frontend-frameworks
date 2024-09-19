"use client";
import Head from 'next/head'
import DoughnutChart from './_components/DoughnutChart'
import dynamic from 'next/dynamic'
import PaymentCard  from './_components/PaymentCard'
import styles from './_styles/Reports.module.css';

const LineChart = dynamic(() => import('./_components/LineChart'), {
});

export default function Reports() {
  return (
    <>
      <Head>
        <title>Reports</title>
        <meta name="description" content="Reports page from Organiza" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


        <div className={styles.mainContent} style={{ height: "100%" }}>
          <h1 className={styles.heading}>Relatórios</h1>

          <div className={styles.chartSection} style={{ width: "100%" }}>
            <LineChart />
          </div>

          <div className={styles.summarySection}>
            
            <div className={styles.gastosPorCategoria}>
              <DoughnutChart />
            </div>
            <div className={styles.pagamentosEmAtraso}>
              <PaymentCard />
            </div>
          </div>
        </div>
    </>
  );
}
