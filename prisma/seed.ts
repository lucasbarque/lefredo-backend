import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

  const sections = await prisma.menu.createMany({
    data: [
      {
        title: 'Entradas',
        restaurantId: menu.id,
      },
      {
        title: 'Pratos Principais',
        restaurantId: menu.id,
      },
      {
        title: 'Sanduíches e Burgers',
        restaurantId: menu.id,
      },
      {
        title: 'Super Saladas & Bowls',
        restaurantId: menu.id,
      },
      {
        title: 'Pokes',
        restaurantId: menu.id,
      },
      {
        title: 'Sobremesas',
        restaurantId: menu.id,
      },
      {
        title: 'Não alcoólicos',
        restaurantId: menu.id,
      },
    ],
  });

  const dishes = await prisma.dish.createMany({
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
        title: 'Medalhão de Filé e Risoto Funghi',
        description:
          'Corte alto do filé mignon ao molho de vinho tinto, acompanhado de risoto de cogumelos frescos e funghi seco.',
        price: 9900,
        sectionId: sections[1].id,
      },
      {
        title: 'Ancho',
        description:
          'Bife ancho (240g in natura) com gratin de batata e salada de folhas e tomate cereja finalizada com parmesão e raspas de limão siciliano. Acompanha chimichurri. Servimos somente mal passado, ponto menos e ao ponto (o ponto da casa é vermelho).',
        price: 9900,
        sectionId: sections[1].id,
      },
      {
        title: 'Filé na Panko',
        description:
          'Filé mignon empanado com farinha panko. Escolha o acompanhamento: nhoque de baroa com molho bechamel, finalizado com lascas de amêndoas e fio de azeite trufado ou massa artesanal ao molho rústico de tomate.',
        price: 7900,
        sectionId: sections[1].id,
      },
      {
        title: 'Tomato Sun-Dried Risoto',
        description:
          'Risoto de tomate desidratado, finalizado com creme de burrata e crosta de parmesão. Caso deseje, dê um boost de proteína. Medalhão de filé +R$22 | Salmão +R$25 | Filé de frango +R$18 | Camarão +R$36,00.',
        price: 7900,
        sectionId: sections[1].id,
      },
      {
        title: 'Pancetta',
        description:
          'Pancetta suína com salada de batata ao estilo Funky (batata bolinha ao murro, maionese da casa, pepino, cebola roxa, páprica e endro) e couve crispy.',
        price: 7800,
        sectionId: sections[1].id,
      },
      {
        title: 'Risoto de limão siciliano com filé de salmão',
        description: '',
        price: 9800,
        sectionId: sections[1].id,
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
