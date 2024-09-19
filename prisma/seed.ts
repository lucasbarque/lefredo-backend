import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  await prisma.media.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.section.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  const passwordSalt = await bcrypt.genSalt(8);

  const passwordHash = await bcrypt.hash('123123', passwordSalt);

  const john = await prisma.user.upsert({
    where: { email: 'johndoe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: passwordHash,
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

  const dishes = await prisma.dish.findMany();

  await prisma.media.createMany({
    data: [
      {
        title: slugify(dishes[0].title),
        type: 'image',
        referenceId: dishes[0].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585299/picture/medium/240603225919',
      },
      {
        title: slugify(dishes[1].title),
        type: 'image',
        referenceId: dishes[1].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585304/picture/medium/240604003614',
      },
      {
        title: slugify(dishes[2].title),
        type: 'image',
        referenceId: dishes[2].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585305/picture/medium/240824153635',
      },
      {
        title: slugify(dishes[3].title),
        type: 'image',
        referenceId: dishes[3].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9693214/picture/medium/240604003636',
      },
      {
        title: slugify(dishes[4].title),
        type: 'image',
        referenceId: dishes[4].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9737437/picture/medium/240603225811',
      },
      {
        title: slugify(dishes[5].title),
        type: 'image',
        referenceId: dishes[5].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9737447/picture/medium/240603225836',
      },
      {
        title: slugify(dishes[7].title),
        type: 'image',
        referenceId: dishes[7].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585308/picture/medium/240603230447',
      },
      {
        title: slugify(dishes[8].title),
        type: 'image',
        referenceId: dishes[8].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585313/picture/medium/240604014345',
      },
      {
        title: slugify(dishes[9].title),
        type: 'image',
        referenceId: dishes[9].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585320/picture/medium/240603230536',
      },
      {
        title: slugify(dishes[10].title),
        type: 'image',
        referenceId: dishes[10].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585319/picture/medium/240603230607',
      },
      {
        title: slugify(dishes[11].title),
        type: 'image',
        referenceId: dishes[11].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585315/picture/medium/240603230633',
      },
      {
        title: slugify(dishes[12].title),
        type: 'image',
        referenceId: dishes[12].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585316/picture/medium/240603230647',
      },
      {
        title: slugify(dishes[13].title),
        type: 'image',
        referenceId: dishes[13].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585323/picture/medium/240603230730',
      },
      {
        title: slugify(dishes[14].title),
        type: 'image',
        referenceId: dishes[14].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585324/picture/medium/240603173943',
      },
      {
        title: slugify(dishes[15].title),
        type: 'image',
        referenceId: dishes[15].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/10773180/picture/medium/240824174838',
      },
      {
        title: slugify(dishes[16].title),
        type: 'image',
        referenceId: dishes[16].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/10773239/picture/medium/240702233956',
      },
      {
        title: slugify(dishes[17].title),
        type: 'image',
        referenceId: dishes[17].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585321/picture/medium/240603231529',
      },
      {
        title: slugify(dishes[18].title),
        type: 'image',
        referenceId: dishes[18].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585322/picture/medium/240604005000',
      },
      {
        title: slugify(dishes[19].title),
        type: 'image',
        referenceId: dishes[19].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585331/picture/medium/240911020312',
      },
      {
        title: slugify(dishes[20].title),
        type: 'image',
        referenceId: dishes[20].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585334/picture/medium/240911020323',
      },
      {
        title: slugify(dishes[21].title),
        type: 'image',
        referenceId: dishes[21].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585335/picture/medium/240911020731',
      },
      {
        title: slugify(dishes[22].title),
        type: 'image',
        referenceId: dishes[22].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585336/picture/medium/240911020355',
      },
      {
        title: slugify(dishes[24].title),
        type: 'image',
        referenceId: dishes[24].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/10874848/picture/medium/240604004751',
      },
      {
        title: slugify(dishes[25].title),
        type: 'image',
        referenceId: dishes[25].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/10872773/picture/medium/240603232223',
      },
      {
        title: slugify(dishes[26].title),
        type: 'image',
        referenceId: dishes[26].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9661744/picture/medium/240711235018',
      },
      {
        title: slugify(dishes[27].title),
        type: 'image',
        referenceId: dishes[27].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9661890/picture/medium/240603232045',
      },
      {
        title: slugify(dishes[28].title),
        type: 'image',
        referenceId: dishes[28].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9661893/picture/medium/240603233428',
      },
      {
        title: slugify(dishes[29].title),
        type: 'image',
        referenceId: dishes[29].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585345/picture/medium/240603173712',
      },
      {
        title: slugify(dishes[30].title),
        type: 'image',
        referenceId: dishes[30].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585346/picture/medium/240603231559',
      },
      {
        title: slugify(dishes[31].title),
        type: 'image',
        referenceId: dishes[31].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9944875/picture/medium/240603231738',
      },
      {
        title: slugify(dishes[32].title),
        type: 'image',
        referenceId: dishes[32].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/10290315/picture/medium/240604010134',
      },
      {
        title: slugify(dishes[33].title),
        type: 'image',
        referenceId: dishes[33].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9933444/picture/medium/240604014559',
      },
      {
        title: slugify(dishes[34].title),
        type: 'image',
        referenceId: dishes[34].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9912746/picture/medium/240702162941',
      },
      {
        title: slugify(dishes[35].title),
        type: 'image',
        referenceId: dishes[35].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585350/picture/medium/240604005935',
      },
      {
        title: slugify(dishes[36].title),
        type: 'image',
        referenceId: dishes[36].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585352/picture/medium/240906001548',
      },
      {
        title: slugify(dishes[37].title),
        type: 'image',
        referenceId: dishes[37].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585385/picture/medium/240903163814',
      },
      {
        title: slugify(dishes[38].title),
        type: 'image',
        referenceId: dishes[38].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585383/picture/medium/240903163814',
      },
      {
        title: slugify(dishes[39].title),
        type: 'image',
        referenceId: dishes[39].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585386/picture/medium/240903163811',
      },
      {
        title: slugify(dishes[40].title),
        type: 'image',
        referenceId: dishes[40].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585387/picture/medium/240903163808',
      },
      {
        title: slugify(dishes[41].title),
        type: 'image',
        referenceId: dishes[41].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/10007801/picture/medium/240903163808',
      },
      {
        title: slugify(dishes[42].title),
        type: 'image',
        referenceId: dishes[42].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585389/picture/medium/240903163627',
      },
      {
        title: slugify(dishes[43].title),
        type: 'image',
        referenceId: dishes[43].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585390/picture/medium/240903163627',
      },
      {
        title: slugify(dishes[44].title),
        type: 'image',
        referenceId: dishes[44].id,
        referenceName: 'dishes',
        filename:
          'https://www.goomer.app/webmenu/funkyfresh/product/9585392/picture/medium/240709163904',
      },
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
