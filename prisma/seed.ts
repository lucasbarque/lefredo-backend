import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.media.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.section.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  const john = await prisma.user.upsert({
    where: { email: 'johndoe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    },
  });

  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Funky Fresh',
      userId: john.id,
    },
  });

  const menu = await prisma.menu.create({
    data: {
      title: 'Principal',
      restaurantId: restaurant.id,
    },
  });

  await prisma.section.createMany({
    data: [
      {
        title: 'Entradas',
        menuId: menu.id,
      },
      {
        title: 'Brunch',
        menuId: menu.id,
      },
      {
        title: 'Pratos Principais',
        menuId: menu.id,
      },
      {
        title: 'Sanduíches e Burgers',
        menuId: menu.id,
      },
      {
        title: 'Super Saladas & Bowls',
        menuId: menu.id,
      },
      {
        title: 'Pokes',
        menuId: menu.id,
      },
      {
        title: 'Açaís e bowl de frutas',
        menuId: menu.id,
      },
      {
        title: 'Sobremesas',
        menuId: menu.id,
      },
      {
        title: 'Não alcoólicos',
        menuId: menu.id,
      },
    ],
  });

  const sections = await prisma.section.findMany();

  await prisma.dish.createMany({
    data: [
      {
        title: 'Trio de Pastas',
        description:
          'Homus tahine, homus de beterraba e tzatziki, acompanhadas de torradas da casa e palitinhos de cenoura e pepino.',
        price: 4900,
        sectionId: sections[0].id,
      },
      {
        title: 'Gyro',
        description:
          'Entrada de origem grega, feita com pão naan, babaganoush, pasta de iogurte com hortelã, vinagrete de tomate e tiras de filé mignon.',
        price: 6900,
        sectionId: sections[0].id,
      },
      {
        title: 'Mini Burguer with Fries',
        description:
          'Mini hambúrgueres com blend de queijos, picles de pepino e cebola roxa, mostarda e ketchup, acompanhado de batatas fritas e ketchup artesanal.',
        price: 8400,
        sectionId: sections[0].id,
      },
      {
        title: 'Yuca balls',
        description:
          'Croquetas de carne seca e mandioca finalizado com parmesão e servido com geleia de pimenta.',
        price: 4600,
        sectionId: sections[0].id,
      },
      {
        title: 'French fries',
        description: 'Batata frita acompanhada de ketchup artesanal.',
        price: 2800,
        sectionId: sections[0].id,
      },
      {
        title: 'Funky fries',
        description:
          'Batata frita finalizada com azeite trufado e parmesão acompanhada de ketchup artesanal.',
        price: 4200,
        sectionId: sections[0].id,
      },
      {
        title: 'What the Funky',
        description:
          'Toast no pão de fermentação natural, creme de burrata, presunto de parma, figo ao mel, finalizado com mix de castanhas e redução de laranja.',
        price: 4800,
        sectionId: sections[1].id,
      },
      {
        title: 'Groovy',
        description:
          'Ovos mexidos, cogumelos salteados, bacon, queijo coalho grelhado e fatias de pão de fermentação natural.',
        price: 5200,
        sectionId: sections[1].id,
      },
      {
        title: 'Toast de Cogumelos',
        description:
          'Mix de cogumelos salteados sobre uma crosta de mozzarella de búfala no pão de fermentação natural. Ⓥ para veganos, substituímos o queijo por fatias de abacate, informar ao atendente.',
        price: 4600,
        sectionId: sections[1].id,
      },
      {
        title: 'Italian Typical',
        description:
          'Pão de fermentação natural, mozzarela de búfala, presunto parma, pesto de manjericão e rúcula.',
        price: 5600,
        sectionId: sections[1].id,
      },
      {
        title: 'Club Sandwich',
        description:
          'Pão miga, frango marinado desfiado com molho tártaro, ovo frito, bacon crocante, alface, tomate e maionese de wasabi.',
        price: 4600,
        sectionId: sections[1].id,
      },
      {
        title: 'Pão Levain na Chapa com Manteiga',
        description: '',
        price: 1400,
        sectionId: sections[1].id,
      },
      {
        title: 'Pão Levain na Chapa com Requeijão',
        description: '',
        price: 2200,
        sectionId: sections[1].id,
      },
      {
        title: 'Ovos Mexidos Cremosos',
        description: 'Acompanha fatia de pão de fermentação natural.',
        price: 1900,
        sectionId: sections[1].id,
      },
      {
        title: 'Ovos Mexidos com Requeijão',
        description: 'Acompanha fatia de pão de fermentação natural.',
        price: 2400,
        sectionId: sections[1].id,
      },
      {
        title: 'Shrimp roll',
        description:
          'Pão brioche, maionese de wasabi, camarões salteados na manteiga, finalizado com crisps de cebola, páprica e endro. Acompanha duas unidades de jalapeño poppers - pimenta jalapeño empanada e recheada com mix de queijos.',
        price: 8800,
        sectionId: sections[3].id,
      },
      {
        title: 'Cheddar smash burger',
        description:
          'O favorito do especial de aniversario do Funky Fresh. Pão brioche, smash burguer duplo, queijo cheddar, creme de cheddar, bacon, mix de cebola caramelizada e cebola crispy. Adicional de batata frita com creme de cheddar +R$16,00.',
        price: 5600,
        sectionId: sections[3].id,
      },
      {
        title: 'Funky Patty',
        description:
          'Hambúrguer no pão brioche, blend de queijos, alface, tomate, picles de cebola roxa e maionese. Adicione french fries com ketchup artesanal por + R$10',
        price: 5200,
        sectionId: sections[3].id,
      },
      {
        title: 'Chicken Hero',
        description:
          'Filé de frango empanado no pão brioche, queijo prato, alface, tomate e molho tártaro com picles. Adicione french fries com ketchup artesanal por + R$10',
        price: 4900,
        sectionId: sections[3].id,
      },
      {
        title: 'Honey Figo',
        description:
          'Mix de folhas com queijo coalho, figo, trigo em grãos, fatias de abacate, tomate cereja e honey mustard. Caso deseje, dê um boost de proteína na sua salada: Medalhão de filé +R$22,00 | Salmão +R$25,00 | Filé de frango +R$18,00 | Camarão +R$ 36,00',
        price: 5600,
        sectionId: sections[4].id,
      },
      {
        title: 'Crispy Chicken',
        description:
          'Repolho roxo, repolho branco, cenoura, pepino, couve kale, mix de castanhas e molho à base de pasta de amendoim, finalizado com frango crocante. Caso deseje, dê um boost de proteína na sua salada: Medalhão de filé +R$22,00 | Salmão +R$25,00 | Filé de frango +R$18,00 | Camarão +R$36,00 Hambúrguer +R$20',
        price: 5800,
        sectionId: sections[4].id,
      },
      {
        title: 'Salmon Hype',
        description:
          'Bowl de salmão grelhado ao molho ponzu com mix de folhas, cuscuz marroquino, legumes salteados. Ⓥ para vegetarianos e veganos, substituímos salmão por mix de cogumelos e molho de shoyu e limão, informar ao atendente. Caso deseje, dê um boost de proteína na sua salada: Medalhão de filé +R$22,00 | Salmão +R$25,00 | Filé de frango +R$18,00 | Camarão + R$36,00',
        price: 7900,
        sectionId: sections[4].id,
      },
      {
        title: 'Asian Fake',
        description:
          'Bowl de rosbife de filé mignon finalizado com pimenta do reino preta, mix de folhas, quinoa, ovo cozido, batata bolinha e queijo parmesão ao molho oriental levemente apimentado. Caso deseje, dê um boost de proteína na sua salada: Medalhão de filé +R$22,00 | Salmão +R$25,00 | Filé de frango +R$18,00 | Camarão + R$36,00 Hambúrguer +R$20',
        price: 7400,
        sectionId: sections[4].id,
      },
      {
        title: 'Aleluia, Poke!',
        description:
          'Um mix dos mais pedidos do delivery finalmente entrou no menu.Escolha sua base : -gohan ,-mix de folhas ou -gohan com mix de folhas .Poke de salmão com beterraba, grão de bico crocante, abacate, edamame e nori crocante. Dê um boost com cogumelos + R$12,00.',
        price: 7600,
        sectionId: sections[4].id,
      },
      {
        title: 'Orange Chicken',
        description:
          'Tempurá de frango ao molho de laranja apimentado, gohan finalizado com mix de gergelim, acompanha vagem e saladinha de manga verde (sazonal - manga verde, cebola roxa e pimenta dedo de moça)',
        price: 6900,
        sectionId: sections[4].id,
      },
      {
        title: 'Poke de Salmão',
        description:
          'Salmão, ovo cozido, abacate, edamame, picles de beterraba e nori crocante.',
        price: 7200,
        sectionId: sections[5].id,
      },
      {
        title: 'Poke de Camarão',
        description:
          'Camarão, ovo cozido, couve crispy, abacate, picles de beterraba, picles de cebola roxa, edamame, mix de salada thai (repolho branco, roxo e cenoura) e grão de bico crocante com páprica.',
        price: 7400,
        sectionId: sections[5].id,
      },
      {
        title: 'Poke de Cogumelos',
        description:
          'Mix de cogumelos, tofu marinado com gergelim, sunomono de pepino, grão de bico com páprica, mix de salada thai (repolho branco, roxo e cenoura) e mix de castanhas.',
        price: 5800,
        sectionId: sections[5].id,
      },
      {
        title: 'Monte o Seu Poke',
        description:
          'Escolha a sua base, proteína, molho e cinco acompanhamentos.',
        price: 6000,
        sectionId: sections[5].id,
      },
      {
        title: 'Açaí com Banana',
        description:
          'Açaí direto da amazônia, fresh, puro e sem xarope de guaraná, batido com banana, açucar mascavo e granola artesanal. Acompanha mel.',
        price: 4400,
        sectionId: sections[6].id,
      },
      {
        title: 'Açaí com Morango',
        description:
          'Açaí direto da amazônia, fresh, puro e sem xarope de guaraná, batido com morango,açucar mascavo e granola artesanal. Acompanha mel.',
        price: 4800,
        sectionId: sections[6].id,
      },
      {
        title: 'Triple Chocolate',
        description:
          'Torta de chocolate com 3 camadas: bolo de chocolate meio amargo, creme de chocolate e finalizado na hora com ganache de chocolate.',
        price: 3600,
        sectionId: sections[7].id,
      },
      {
        title: 'Nutty Pancakes',
        description:
          'Panquecas de cenoura com nutella finalizadas com flakes crocantes ao chocolate ao leite.',
        price: 4200,
        sectionId: sections[7].id,
      },
      {
        title: 'Jam Pie Ⓥ',
        description:
          'Torta de limão siciliano e abacate sobre uma base crocante de tâmara e amêndoas finalizada com geleia de frutas vermelhas. Vegana.',
        price: 4400,
        sectionId: sections[7].id,
      },
      {
        title: 'Cocada blast',
        description: 'Cocada de forno brûlée com creme de limão siciliano.',
        price: 3400,
        sectionId: sections[7].id,
      },
      {
        title: 'Funky Brownie',
        description:
          'House special brownie com ganache de chocolate e sorvete de baunilha',
        price: 4200,
        sectionId: sections[7].id,
      },
      {
        title: 'Banoffee',
        description: '',
        price: 3200,
        sectionId: sections[7].id,
      },
      {
        title: 'Laranja',
        description: '',
        price: 1200,
        sectionId: sections[8].id,
      },
      {
        title: 'Abacaxi & Hortelã',
        description: '',
        price: 1200,
        sectionId: sections[8].id,
      },
      {
        title: 'Antioxidante',
        description: 'Laranja, beterraba, cenoura e gengibre.',
        price: 2200,
        sectionId: sections[8].id,
      },
      {
        title: 'Wild Green',
        description: 'Água de coco, abacaxi, couve, limão e gengibre',
        price: 2400,
        sectionId: sections[8].id,
      },
      {
        title: 'Limão',
        description: '',
        price: 1200,
        sectionId: sections[8].id,
      },
      {
        title: 'Água sem gás',
        description: '',
        price: 800,
        sectionId: sections[8].id,
      },
      {
        title: 'Água com Gás',
        description: 'Água com gás da casa direto da máquina, sem sódio.',
        price: 800,
        sectionId: sections[8].id,
      },
      {
        title: 'Refrigerante',
        description: '',
        price: 900,
        sectionId: sections[8].id,
      },
      // {
      //   title: 'Medalhão de Filé e Risoto Funghi',
      //   description:
      //     'Corte alto do filé mignon ao molho de vinho tinto, acompanhado de risoto de cogumelos frescos e funghi seco.',
      //   price: 9900,
      //   sectionId: sections[1].id,
      // },
      // {
      //   title: 'Ancho',
      //   description:
      //     'Bife ancho (240g in natura) com gratin de batata e salada de folhas e tomate cereja finalizada com parmesão e raspas de limão siciliano. Acompanha chimichurri. Servimos somente mal passado, ponto menos e ao ponto (o ponto da casa é vermelho).',
      //   price: 9900,
      //   sectionId: sections[1].id,
      // },
      // {
      //   title: 'Filé na Panko',
      //   description:
      //     'Filé mignon empanado com farinha panko. Escolha o acompanhamento: nhoque de baroa com molho bechamel, finalizado com lascas de amêndoas e fio de azeite trufado ou massa artesanal ao molho rústico de tomate.',
      //   price: 7900,
      //   sectionId: sections[1].id,
      // },
      // {
      //   title: 'Tomato Sun-Dried Risoto',
      //   description:
      //     'Risoto de tomate desidratado, finalizado com creme de burrata e crosta de parmesão. Caso deseje, dê um boost de proteína. Medalhão de filé +R$22 | Salmão +R$25 | Filé de frango +R$18 | Camarão +R$36,00.',
      //   price: 7900,
      //   sectionId: sections[1].id,
      // },
      // {
      //   title: 'Pancetta',
      //   description:
      //     'Pancetta suína com salada de batata ao estilo Funky (batata bolinha ao murro, maionese da casa, pepino, cebola roxa, páprica e endro) e couve crispy.',
      //   price: 7800,
      //   sectionId: sections[1].id,
      // },
      // {
      //   title: 'Risoto de limão siciliano com filé de salmão',
      //   description: '',
      //   price: 9800,
      //   sectionId: sections[1].id,
      // },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
