// Hero.jsx
import styles from "./style";

const Hero = () => {

  const pinkGradient = 'bg-gradient-to-r from-pink-100 to-pink-300 filter blur-[150px]'; // Diminuir ainda mais a força do gradiente rosa
  const whiteGradient = 'bg-white bg-opacity-40 filter blur-[200px]'; // Ajustar a força do gradiente branco
  const blueGradient = 'bg-gradient-to-t from-transparent via-blue-600 to-transparent filter blur-[60px]'; // Ajustar a força do gradiente azul
  const bgDiscountGradient = 'bg-gradient-to-tr from-gray-600 to-indigo-800'; // Manter ou ajustar a força do gradiente de desconto

  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} bg-white`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 md:items-center md:text-center`}>
        <div className={`flex flex-row items-center py-2 px-4 ${bgDiscountGradient} rounded-md mb-4 mx-auto`}>
          <img src={'https://i.imgur.com/5BZrGDw.png'} alt="icon" className="w-8 h-8" />
          <p className={`${styles.paragraph} ml-2 text-gray-100`}>
            Seu Centro de Controle Financeiro
          </p>
        </div>

        <div className="flex flex-col items-center w-full">
          <h1 className="font-poppins font-bold ss:text-7xl text-5xl text-gray-800 ss:leading-[100.8px] leading-[75px] text-center">
            O Próximo <br className="sm:block hidden" />
            <span className="text-[#4B0082]">Passo</span> {/* Cor roxa escura */}
          </h1>
        </div>

        <h1 className="font-poppins font-bold ss:text-6xl text-5xl text-gray-800 ss:leading-[100.8px] leading-[75px] w-full mt-4 text-center">
          Controle suas Finanças
        </h1>
        <p className={`${styles.paragraph} max-w-2xl mx-auto mt-5 text-gray-600 text-center`}>
          Nossa plataforma ajuda você a gerenciar sua saúde financeira monitorando despesas, definindo orçamentos e analisando seus hábitos de gasto. Assuma o controle do seu futuro financeiro com nossas ferramentas e insights fáceis de usar.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={'https://i.imgur.com/8RJDGMU.png'} alt="controle-financeiro" className="w-full h-full relative z-10" />

        {/* gradient start */}
        <div className={`absolute z-0 w-1/3 h-1/4 top-0 ${pinkGradient}`} />
        <div className={`absolute z-10 w-4/5 h-4/5 rounded-full ${whiteGradient} bottom-1/4`} />
        <div className={`absolute z-0 w-1/2 h-1/2 right-5 bottom-5 ${blueGradient}`} />
        {/* gradient end */}
      </div>
    </section>
  );
};

export default Hero;
