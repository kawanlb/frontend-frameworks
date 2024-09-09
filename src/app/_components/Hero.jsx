import { FaPercentage } from "react-icons/fa"; // Ícone de porcentagem

const Hero = () => {
  const pinkGradient = 'bg-gradient-to-r from-pink-100 to-pink-300 filter blur-[150px]';
  const blueGradient = 'bg-gradient-to-t from-transparent via-blue-600 to-transparent filter blur-[60px]';

  return (
    <section id="home" className="flex md:flex-row flex-col bg-white py-12">
      <div className="flex-1 flex flex-col xl:px-0 sm:px-16 px-6 md:items-center md:text-center">
        
        {/* Caixa de Desconto com ícone */}
        <div 
          className="flex flex-row items-center py-1 px-3 rounded-md mb-4 mx-auto"
          style={{
            background: 'linear-gradient(to top right, #4B0082, #483D8B)',
            color: '#FFFFFF'
          }}
        >
          <FaPercentage style={{ width: '24px', height: '24px' }} />
          <p style={{ marginTop: '10px', marginLeft: '8px', fontWeight: 'bold', fontSize: '18px' }}>
            Seu Centro de Controle Financeiro
          </p>
        </div>

        {/* Título */}
        <div className="flex flex-col items-center w-full">
          <h1 
            className="font-poppins font-bold ss:text-7xl text-5xl ss:leading-[100.8px] leading-[75px] text-center"
            style={{ color: '#333333' }}
          >
            O Próximo <br className="sm:block hidden" />
            <span style={{ color: '#4B0082' }}>Passo</span>
          </h1>
        </div>

        <h1 
          className="font-poppins font-bold ss:text-6xl text-5xl ss:leading-[100.8px] leading-[75px] w-full mt-4 text-center"
          style={{ color: '#333333' }}
        >
          Controle suas Finanças
        </h1>

        <p className="max-w-2xl mx-auto mt-5 text-center" style={{ color: '#666666' }}>
          Nossa plataforma ajuda você a gerenciar sua saúde financeira monitorando despesas, definindo orçamentos e analisando seus hábitos de gasto. Assuma o controle do seu futuro financeiro com nossas ferramentas e insights fáceis de usar.
        </p>
      </div>

      {/* Imagem do Lado */}
      <div className="flex-1 flex items-center justify-center md:my-0 my-10 relative">
        <img src="/hero-sideimage.png" alt="controle-financeiro" className="w-full h-full relative z-10" />

        {/* Remoção do gradiente branco */}
        <div className={`absolute z-0 w-1/3 h-1/4 top-0 ${pinkGradient}`} />
        <div className={`absolute z-0 w-1/2 h-1/2 right-5 bottom-5 ${blueGradient}`} />
      </div>
    </section>
  );
};

export default Hero;
