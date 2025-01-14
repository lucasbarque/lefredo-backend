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

  const userDefault = await prisma.user.upsert({
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
      name: 'Niura Doceria',
      userId: userDefault.id,
    },
  });

  const menu = await prisma.menu.create({
    data: {
      title: 'Geral',
      restaurantId: restaurant.id,
    },
  });

  await prisma.section.createMany({
    data: [
      {
        title: 'Salgados',
        menuId: menu.id,
      },
      {
        title: 'Panini e Sanduíches',
        menuId: menu.id,
      },
      {
        title: 'Bebidas Geladas',
        menuId: menu.id,
      },
      {
        title: 'Frapês e Ice',
        menuId: menu.id,
      },
      {
        title: 'Bebidas Quentes',
        menuId: menu.id,
      },
      {
        title: 'Doces e Sobremesas',
        menuId: menu.id,
      },
      {
        title: 'Cassatas',
        menuId: menu.id,
      },
    ],
  });

  const sections = await prisma.section.findMany();

  await prisma.dish.createMany({
    data: [
      {
        title: 'Pão de Queijo',
        description: 'Porção com 4 unidades.',
        price: 1000,
        sectionId: sections[0].id,
      },
      {
        title: 'Empada',
        description: 'uni. Sabores: Frango | Palmito | Frango com Palmito',
        price: 1400,
        sectionId: sections[0].id,
      },
      {
        title: 'Coxinha de Frango',
        description:
          'uni. Massa de mandioca com recheio de frango com catupiry, empanada na farinha panko.',
        price: 1500,
        sectionId: sections[0].id,
      },
      {
        title: 'Bauru',
        description:
          'uni. Massa semifolhada recheada com presunto, queijo muçarela, tomate, orégano e requeijão cremoso.',
        price: 1500,
        sectionId: sections[0].id,
      },
      {
        title: 'Tortinha Pantaneira',
        description:
          'uni. Massa folhada, recheada com carne seca, catupiry e banana da terra.',
        price: 1800,
        sectionId: sections[0].id,
      },
      {
        title: 'Empada Especial',
        description: 'uni. Sabor: Camarão',
        price: 1800,
        sectionId: sections[0].id,
      },
      {
        title: 'Quiche',
        description: 'a fatia. Sabor: Queijo brie com damasco.',
        price: 1800,
        sectionId: sections[0].id,
      },
      {
        title: 'Folhado de Calabresa',
        description:
          'uni. Massa semifolhada com recheio de calabresa, cebola caramelizada, muçarela e catupiry finalizado com queijo parmesão.',
        price: 1500,
        sectionId: sections[0].id,
      },
      {
        title: 'Queijo Quente',
        description:
          'Pão italiano de fermentação natural, requeijão, muçarela e parmesão.',
        price: 2200,
        sectionId: sections[1].id,
      },
      {
        title: 'Croque Monsieur',
        description:
          'Pão de forma artesanal, manteiga, presunto, muçarela, molho bechamel e parmesão gratinado no forno.',
        price: 2400,
        sectionId: sections[1].id,
      },
      {
        title: 'Panini da Casa',
        description:
          'Pão brioche artesanal, presunto, muçarela, tomate e requeijão, servido quentinho.',
        price: 2400,
        sectionId: sections[1].id,
      },
      {
        title: 'Panini Itália',
        description:
          'Pão italiano de fermentação natural, molho pesto, muçarela de búfala, presunto de parma, rúcula, tomate e requeijão, servido frio.',
        price: 3200,
        sectionId: sections[1].id,
      },
      {
        title: 'Água Mineral',
        description: 'pet 500ml Sem Gás | Com Gás',
        price: 600,
        sectionId: sections[2].id,
      },
      {
        title: 'Refrigerante',
        description: 'lata 350ml',
        price: 700,
        sectionId: sections[2].id,
      },
      {
        title: 'Refrigerante Mini',
        description: 'lata 220ml',
        price: 400,
        sectionId: sections[2].id,
      },
      {
        title: 'Suco Del Vale',
        description: 'lata 290ml',
        price: 700,
        sectionId: sections[2].id,
      },
      {
        title: 'Chá Matte Leão com Limão',
        description: 'copo 400ml',
        price: 1000,
        sectionId: sections[2].id,
      },
      {
        title: 'Wewi Tônica Rosé',
        description: 'garrafa 255ml',
        price: 1000,
        sectionId: sections[2].id,
      },
      {
        title: 'Wewi Tônica Tangerina',
        description: 'garrafa 255ml',
        price: 1000,
        sectionId: sections[2].id,
      },
      {
        title: 'Wewi Tea Soda',
        description: 'garrafa 255ml',
        price: 1000,
        sectionId: sections[2].id,
      },
      {
        title: 'Suco de Laranja',
        description: 'copo 400ml',
        price: 1000,
        sectionId: sections[2].id,
      },
      {
        title: 'Suco de Laranja com Morango',
        description: 'copo 400ml',
        price: 1400,
        sectionId: sections[2].id,
      },
      {
        title: 'Soda Italiana',
        description: 'copo 365ml (Consulte a disponibilidade de sabores)',
        price: 1400,
        sectionId: sections[2].id,
      },
      {
        title: 'Ice Cappuccino',
        description:
          'Nosso famoso capuccino da casa, na versão geladinha! Leite, café canela, cacau e chantilly.',
        price: 2000,
        sectionId: sections[3].id,
      },
      {
        title: 'Ice Latte Caramelo',
        description:
          'Caramelo salgado artesanal, leite, café, gelo e crema do leite.',
        price: 2000,
        sectionId: sections[3].id,
      },
      {
        title: 'Frapê de Nutella',
        description: 'Leite, café espresso, Nutella e chantilly.',
        price: 2200,
        sectionId: sections[3].id,
      },
      {
        title: 'Frapê de Ovomaltine',
        description: 'Leite, café espresso, Ovomaltine e chantilly.',
        price: 2200,
        sectionId: sections[3].id,
      },
      {
        title: 'Frapê de Doce de Leite com Paçoca',
        description: 'Leite, café espresso, doce de leite, paçoca e chantilly.',
        price: 2200,
        sectionId: sections[3].id,
      },
      {
        title: 'Frapê de Red Velvet',
        description:
          'Leite, morango, cream cheese, geleia de frutas vermelhas artesanal e chantilly.',
        price: 2600,
        sectionId: sections[3].id,
      },
      {
        title: 'Café Curto',
        description: '30ml',
        price: 800,
        sectionId: sections[4].id,
      },
      {
        title: 'Café Espresso Simples',
        description: '50ml',
        price: 800,
        sectionId: sections[4].id,
      },
      {
        title: 'Café Espresso Duplo',
        description: '100ml',
        price: 1200,
        sectionId: sections[4].id,
      },
      {
        title: 'Café Macchiatto Simples',
        description: '50ml Café espresso e espuma do leite.',
        price: 1000,
        sectionId: sections[4].id,
      },
      {
        title: 'Café Macchiatto Duplo',
        description: '100ml Café espresso e espuma do leite.',
        price: 1400,
        sectionId: sections[4].id,
      },
      {
        title: 'Mocha',
        description: 'Café espresso, leite cremoso e ganache de chocolate.',
        price: 1600,
        sectionId: sections[4].id,
      },
      {
        title: 'Cappuccino da Casa',
        description:
          '180ml Mistura cremosa e artesanal da casa. Já vem adoçado!',
        price: 1400,
        sectionId: sections[4].id,
      },
      {
        title: 'Cappuccino Italiano',
        description:
          '180ml Receita tradicional de leite, café e espuma do leite.',
        price: 1400,
        sectionId: sections[4].id,
      },
      {
        title: 'Cappuccino Caramelo',
        description:
          '180ml Café espresso, leite cremoso e caramelo salgado artesanal.',
        price: 1600,
        sectionId: sections[4].id,
      },
      {
        title: 'Cappuccino de Nutella',
        description:
          '180ml Café espresso, leite cremoso e Nutella, decorado com borda de Nutella.',
        price: 1600,
        sectionId: sections[4].id,
      },
      {
        title: 'Cappuccino de Pistache',
        description:
          '180ml Café espresso, leite cremoso e brigadeiro de pistache, decorado com borda de brigadeiro de pistache.',
        price: 1800,
        sectionId: sections[4].id,
      },
      {
        title: 'Cappuccino com Leite Vegetal',
        description: '180ml Café espresso e leite vegetal Naveia®',
        price: 1800,
        sectionId: sections[4].id,
      },
      {
        title: 'Cappuccino com Leite Vegetal',
        description: '180ml Café espresso e leite vegetal Naveia®',
        price: 1800,
        sectionId: sections[4].id,
      },
      {
        title: 'Acréscimos',
        description: 'Chantilly - R$ 3,00 | Borda de Nutella - R$ 4,00',
        price: 0,
        sectionId: sections[4].id,
      },
      {
        title: 'Docinho Tradicional',
        description:
          'uni. Sabores: Brigadeiro | Brigadeiro de churros | Brigadeiro de leite ninho | Brigadeiro de leite ninho com Nutella.',
        price: 400,
        sectionId: sections[5].id,
      },
      {
        title: 'Brigadeiro Kinder',
        description: 'uni.',
        price: 500,
        sectionId: sections[5].id,
      },
      {
        title: 'Bombom e Trufa',
        description: 'uni.',
        price: 500,
        sectionId: sections[5].id,
      },
      {
        title: 'Caramelado',
        description:
          'uni. Ouriço - beijinho de coco caramelado envolto por coco queimado.',
        price: 500,
        sectionId: sections[5].id,
      },
      {
        title: 'Bala Baiana',
        description:
          'uni. Beijinho de coco caramelado embalado no papel celofane.',
        price: 600,
        sectionId: sections[5].id,
      },
      {
        title: 'Cenourella',
        description:
          'uni. Bolinho individual com massa fofinha de cenoura recheado e coberto com Nutella.',
        price: 650,
        sectionId: sections[5].id,
      },
      {
        title: 'Bombom de Morango',
        description:
          'uni. Brigadeiro branco recheado de morango e banhado no chocolate.',
        price: 750,
        sectionId: sections[5].id,
      },
      {
        title: 'Surpresa de Uva',
        description:
          'uni. Brigadeiro branco recheado com uva Thompson sem sementes coberto com flakes de chocolate ao leite.',
        price: 750,
        sectionId: sections[5].id,
      },
      {
        title: 'Pão de Mel',
        description:
          'uni. Massa fofinha de pão de mel banhado no chocolate, recheado de doce de leite, beijinho ou brigadeiro.',
        price: 800,
        sectionId: sections[5].id,
      },
      {
        title: 'Palha Italiana',
        description:
          'uni. Brigadeiro cremoso com bolacha de maisena, envolto de leite ninho. Sabores: Brigadeiro tradicional |  Brigadeiro de leite ninho + Brigadeiro.',
        price: 800,
        sectionId: sections[5].id,
      },
      {
        title: 'Palha Italiana Oreo',
        description:
          'uni. Brigadeiro belga recheado com bolacha oreo envolto com flakes de chocolate ao leite.',
        price: 800,
        sectionId: sections[5].id,
      },
      {
        title: 'Torta Fatia da Semana',
        description: 'cada 100g. (Consulte a disponibilidade de sabores)',
        price: 1000,
        sectionId: sections[5].id,
      },
      {
        title: 'Bolo Gelado',
        description:
          'cada 100g. Sabores: Chocomousse | Ninho trufado | Coco com leite condensado | Ninhotella | Leite ninho | Chocolate com cocada cremosa',
        price: 1000,
        sectionId: sections[5].id,
      },
      {
        title: 'Bolo no Pote Maria Valentina',
        description:
          'uni. Pão de ló branco, recheio de creme de leite ninho, brigadeiro cremoso e chantilly',
        price: 1200,
        sectionId: sections[5].id,
      },
      {
        title: 'Chiffon no pote',
        description:
          'uni. Pão de ló de chocolate com recheio e cobertura de mousse de chocolate chiffon.',
        price: 1200,
        sectionId: sections[5].id,
      },
      {
        title: 'Cupcake Red Velvet',
        description:
          'uni. Massa aveludada vermelha com recheio e cobertura de creme doce a base de cream cheese e baunilha.',
        price: 1400,
        sectionId: sections[5].id,
      },
      {
        title: 'Torta Holandesa no Porte',
        description:
          'uni. Base de bolacha amanteigada com creme especial de chocolate branco, ganache de chocolate meio amargo e bolacha calipso.',
        price: 1400,
        sectionId: sections[5].id,
      },
      {
        title: 'Brownie Recheado',
        description:
          'uni. Sabores: Ninho com Nutella | Brigadeiro Duo | Brigadeiro ao Leite. Servido Quentinho!',
        price: 1500,
        sectionId: sections[5].id,
      },
      {
        title: 'Cheesecake de Frutas Vermelhas',
        description:
          'uni. Base de bolacha amanteigada com creme de cream cheese doce e geleia de frutas vermelhas.',
        price: 1600,
        sectionId: sections[5].id,
      },
      {
        title: 'Casquinha de Limão',
        description:
          'uni. Massa amanteigada tipo sablée, recheio de mousse de limão com cobertura de marshmallow.',
        price: 1600,
        sectionId: sections[5].id,
      },
      {
        title: 'Casquinha de Morango',
        description:
          'uni. Massa amanteigada tipo sablée, recheio de creme pâtisserie, morangos e pistache decorando.',
        price: 1600,
        sectionId: sections[5].id,
      },
      {
        title: 'Casquinha de Sucrée',
        description:
          'uni. Massa amanteigada de chocolate tipo sucrée, recheio de trufa de chocolate meio amargo e mousse de chocolate.',
        price: 1600,
        sectionId: sections[5].id,
      },
      {
        title: 'Casquinha de Uva',
        description:
          'uni. Massa amanteigada tipo sablée, recheio de brigadeiro branco e ganache de chocolate ao leite, decorada com uvas thompson sem semente e amêndoas laminadas.',
        price: 1600,
        sectionId: sections[5].id,
      },
      {
        title: 'Casquinha de Brigadeiro Belga',
        description:
          'uni. Massa amanteigada tipo sablée, recheio de brigadeiro belga, decorado com brigadeiro e flakes de chocolate ao leite.',
        price: 1600,
        sectionId: sections[5].id,
      },
      {
        title: 'Fatia Chocolatudo Belga',
        description:
          'fatia. Massa 50% cacau com cobertura de brigadeiro trufado. Servido Quentinho!',
        price: 1600,
        sectionId: sections[5].id,
      },
      {
        title: 'Mini Bolo Surpresa Ninho com Nutella',
        description:
          'uni. Massa 50% cacau com recheio de Nutella e cobertura e brigadeiro de leite ninho. Servido Quentinho!',
        price: 1800,
        sectionId: sections[5].id,
      },
      {
        title: 'Banoffee',
        description:
          'uni. Base de bolacha amanteigada, ganache de doce de leite, banana prata in natura, creme de leite ninho e farofinha crocante de canela.',
        price: 1800,
        sectionId: sections[5].id,
      },
      {
        title: 'Red Velvet',
        description:
          'uni. Camadas de massa aveludada vermelha com recheio de creme doce a base de cream cheese e baunilha.',
        price: 1800,
        sectionId: sections[6].id,
      },
      {
        title: 'Morango',
        description:
          'uni. Brigadeiro de leite ninho, morangos fatiados e Nutella.',
        price: 1800,
        sectionId: sections[6].id,
      },
      {
        title: 'Brownie Ninho com Nutella',
        description:
          'uni. Camadas de brownie, recheio de brigadeiro de leite ninho e Nutella. Servido Quentinho!',
        price: 1800,
        sectionId: sections[6].id,
      },
      {
        title: 'Kinder Duo',
        description:
          'uni. Camadas de pão de ló de chocolate, recheio de mousse de chocolate e brigadeiro branco.',
        price: 1800,
        sectionId: sections[6].id,
      },
      {
        title: 'Quatro Leites com Abacaxi e Ninho',
        description:
          'uni. Camadas de pão de ló branco, recheio de quatro leites, creme de leite ninho e compota artesanal de abacaxi.',
        price: 1800,
        sectionId: sections[6].id,
      },
      {
        title: 'Frutas Vermelhas com Cream Cheese',
        description:
          'uni. Camadas de pão de ló branco, recheio de geleia de frutas vermelhas e creme doce a base de cream cheese e baunilha.',
        price: 1800,
        sectionId: sections[6].id,
      },
      {
        title: 'Surpresa Ninho com Nutella',
        description:
          'uni. Camadas de bolo 50% cacau, recheio de brigadeiro de leite ninho e Nutella.',
        price: 1800,
        sectionId: sections[6].id,
      },
      {
        title: 'Ninho Trufado',
        description:
          'uni. Camadas de pão de ló branco, mousse de leite ninho e ganache de chocolate.',
        price: 1800,
        sectionId: sections[6].id,
      },
      {
        title: 'Pistache',
        description:
          'uni. Camadas de pão de ló branco, brigadeiro branco, crumble de pistache e brigadeiro cremoso de pistache.',
        price: 2200,
        sectionId: sections[6].id,
      },
    ],
  });

  // const dishes = await prisma.dish.findMany();

  // await prisma.media.createMany({
  //   data: [
  //     // {
  //     //   title: slugify(dishes[0].title),
  //     //   type: 'image',
  //     //   referenceId: dishes[0].id,
  //     //   referenceName: 'dishes',
  //     //   filename:
  //     //     'https://www.goomer.app/webmenu/funkyfresh/product/9585299/picture/medium/240603225919',
  //     // },
  //   ],
  // });
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
