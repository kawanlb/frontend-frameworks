import InvestmentsDashboard from './_components/InvestmentsDashboard';

export default async function Investimentos() {
  // Simulando a busca de dados enquanto a API não está disponível
  const investmentsData = [
    {
      id: '1',
      user_id: 'user123',
      tipo_investimento: 'Ações',
      instituicao: 'XP Investimentos',
      valor_investido: 10000,
      rendimento: 1500,
      data_investimento: '2024-01-15',
      data_criacao: '2024-01-01',
      data_atualizacao: '2024-02-01',
    },
    {
      id: '2',
      user_id: 'user123',
      tipo_investimento: 'Fundo Imobiliário',
      instituicao: 'BTG Pactual',
      valor_investido: 5000,
      rendimento: 300,
      data_investimento: '2024-02-10',
      data_criacao: '2024-02-01',
      data_atualizacao: '2024-02-28',
    },
    {
      id: '3',
      user_id: 'user123',
      tipo_investimento: 'Tesouro Direto',
      instituicao: 'Tesouro Nacional',
      valor_investido: 8000,
      rendimento: 400,
      data_investimento: '2024-03-05',
      data_criacao: '2024-03-01',
      data_atualizacao: '2024-03-15',
    },
  ];

  return <InvestmentsDashboard data={investmentsData} />;
}
