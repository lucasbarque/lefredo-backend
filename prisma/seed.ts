import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  await prisma.media.deleteMany();
  await prisma.dishSpecsDishes.deleteMany();
  await prisma.dishExtras.deleteMany();
  await prisma.dishSpecs.deleteMany();
  await prisma.dishFlavors.deleteMany();
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
        description:
          'Nosso estoque é renovado diariamente, portanto algumas opções podem se esgotar ao longo do dia. Favor verificar a disponibilidade do produto com nossos atendentes no momento do pedido!',
        menuId: menu.id,
      },
      {
        title: 'Panini e Sanduíches',
        description:
          'Nosso estoque é renovado diariamente, portanto algumas opções podem se esgotar ao longo do dia. Favor verificar a disponibilidade do produto com nossos atendentes no momento do pedido!',
        menuId: menu.id,
      },
      {
        title: 'Bebidas Geladas',
        menuId: menu.id,
      },
      {
        title: 'Frapês e Ice',
        description:
          'Nosso estoque é renovado diariamente, portanto algumas opções podem se esgotar ao longo do dia. Favor verificar a disponibilidade do produto com nossos atendentes no momento do pedido!',
        menuId: menu.id,
      },
      {
        title: 'Bebidas Quentes',
        description:
          'Café  moído na hora direto da região do Alto Mogiana na variedade Catuaí Amarelo',
        menuId: menu.id,
      },
      {
        title: 'Doces e Sobremesas',
        description:
          'Nosso estoque é renovado diariamente, portanto algumas opções podem se esgotar ao longo do dia. Favor verificar a disponibilidade do produto com nossos atendentes no momento do pedido!',
        menuId: menu.id,
      },
      {
        title: 'Cassatas',
        menuId: menu.id,
      },
    ],
  });

  const sections = await prisma.section.findMany();

  const dishSpecs = await prisma.dishSpecs.createManyAndReturn({
    data: [
      {
        title: 'Mais pedido',
        key: 'highlighted',
      },
      {
        title: 'Servido Gelado',
        key: 'cold',
      },
      {
        title: 'Servido Quente',
        key: 'hot',
      },
      {
        title: 'Vegano',
        key: 'vegan',
      },
    ],
  });

  const dishes = await prisma.dish.createManyAndReturn({
    data: [
      {
        // 0
        title: 'Pão de Queijo',
        description: 'Porção com 4 unidades.',
        price: 1000,
        portion: '04 unidades',
        sectionId: sections[0].id,
      },
      {
        // 1
        title: 'Empada',
        price: 1400,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 2
        title: 'Coxinha de Frango',
        description:
          'Massa de mandioca com recheio de frango com catupiry, empanada na farinha panko.',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 3
        title: 'Bauru',
        description:
          'Massa semifolhada recheada com presunto, queijo muçarela, tomate, orégano e requeijão cremoso.',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 4
        title: 'Tortinha Pantaneira',
        description:
          'Massa folhada, recheada com carne seca, catupiry e banana da terra.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 5
        title: 'Empada Especial de Camarão',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 6
        title: 'Quiche de Queijo brie com damasco',
        price: 1800,
        portion: 'a fatia',
        sectionId: sections[0].id,
      },
      {
        // 7
        title: 'Folhado de Calabresa',
        description:
          'Massa semifolhada com recheio de calabresa, cebola caramelizada, muçarela e catupiry finalizado com queijo parmesão.',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 8
        title: 'Queijo Quente',
        description:
          'Pão italiano de fermentação natural, requeijão, muçarela e parmesão.',
        portion: '01 unidade',
        price: 2200,
        prepTime: 20,
        sectionId: sections[1].id,
      },
      {
        // 9
        title: 'Croque Monsieur',
        description:
          'Pão de forma artesanal, manteiga, presunto, muçarela, molho bechamel e parmesão gratinado no forno.',
        price: 2400,
        portion: '01 unidade',
        prepTime: 20,
        sectionId: sections[1].id,
      },
      {
        // 10
        title: 'Panini da Casa',
        description:
          'Pão brioche artesanal, presunto, muçarela, tomate e requeijão, servido quentinho.',
        price: 2400,
        portion: '01 unidade',
        prepTime: 20,
        sectionId: sections[1].id,
      },
      {
        // 11
        title: 'Panini Itália',
        description:
          'Pão italiano de fermentação natural, molho pesto, muçarela de búfala, presunto de parma, rúcula, tomate e requeijão, servido frio.',
        price: 3200,
        portion: '01 unidade',
        prepTime: 20,
        sectionId: sections[1].id,
      },
      {
        // 12
        title: 'Água Mineral',
        price: 600,
        portion: 'pet 500ml',
        sectionId: sections[2].id,
      },
      {
        // 13
        title: 'Refrigerante',
        price: 700,
        portion: 'lata 350ml',
        sectionId: sections[2].id,
      },
      {
        // 14
        title: 'Refrigerante Mini',
        price: 400,
        portion: 'lata 220ml',
        sectionId: sections[2].id,
      },
      {
        // 15
        title: 'Suco Del Vale',
        price: 700,
        portion: 'lata 290ml',
        sectionId: sections[2].id,
      },
      {
        // 16
        title: 'Chá Matte Leão com Limão',
        price: 1000,
        portion: 'copo 400ml',
        sectionId: sections[2].id,
      },
      {
        // 17
        title: 'Wewi Tônica Rosé',
        price: 1000,
        portion: 'garrafa 255ml',
        sectionId: sections[2].id,
      },
      {
        // 18
        title: 'Wewi Tônica Tangerina',
        price: 1000,
        portion: 'garrafa 255ml',
        sectionId: sections[2].id,
      },
      {
        // 19
        title: 'Wewi Tea Soda',
        price: 1000,
        portion: 'garrafa 255ml',
        sectionId: sections[2].id,
      },
      {
        // 20
        title: 'Suco de Laranja',
        price: 1000,
        portion: 'copo 400ml',
        sectionId: sections[2].id,
      },
      {
        // 21
        title: 'Suco de Laranja com Morango',
        price: 1400,
        portion: 'copo 400ml',
        sectionId: sections[2].id,
      },
      {
        // 22
        title: 'Soda Italiana',
        description: '(Consulte a disponibilidade de sabores)',
        price: 1400,
        portion: 'copo 365ml',
        sectionId: sections[2].id,
      },
      {
        // 23
        title: 'Ice Cappuccino',
        description:
          'Nosso famoso capuccino da casa, na versão geladinha! Leite, café canela, cacau e chantilly.',
        price: 2000,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 24
        title: 'Ice Latte Caramelo',
        description:
          'Caramelo salgado artesanal, leite, café, gelo e crema do leite.',
        price: 2000,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 25
        title: 'Frapê de Nutella',
        description: 'Leite, café espresso, Nutella e chantilly.',
        price: 2200,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 26
        title: 'Frapê de Ovomaltine',
        description: 'Leite, café espresso, Ovomaltine e chantilly.',
        price: 2200,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 27
        title: 'Frapê de Doce de Leite com Paçoca',
        description: 'Leite, café espresso, doce de leite, paçoca e chantilly.',
        price: 2200,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 28
        title: 'Frapê de Red Velvet',
        description:
          'Leite, morango, cream cheese, geleia de frutas vermelhas artesanal e chantilly.',
        price: 2600,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 29
        title: 'Café Curto',
        price: 800,
        portion: '30ml',
        sectionId: sections[4].id,
      },
      {
        // 30
        title: 'Café Espresso Simples',
        price: 800,
        portion: '50ml',
        sectionId: sections[4].id,
      },
      {
        // 31
        title: 'Café Espresso Duplo',
        price: 1200,
        portion: '100ml',
        sectionId: sections[4].id,
      },
      {
        // 32
        title: 'Café Macchiatto Simples',
        description: 'Café espresso e espuma do leite.',
        price: 1000,
        portion: '50ml',
        sectionId: sections[4].id,
      },
      {
        // 33
        title: 'Café Macchiatto Duplo',
        description: 'Café espresso e espuma do leite.',
        price: 1400,
        portion: '100ml',
        sectionId: sections[4].id,
      },
      {
        // 34
        title: 'Mocha',
        description: 'Café espresso, leite cremoso e ganache de chocolate.',
        price: 1600,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 35
        title: 'Cappuccino da Casa',
        description: 'Mistura cremosa e artesanal da casa. Já vem adoçado!',
        price: 1400,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 36
        title: 'Cappuccino Italiano',
        description: 'Receita tradicional de leite, café e espuma do leite.',
        price: 1400,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 37
        title: 'Cappuccino Caramelo',
        description:
          'Café espresso, leite cremoso e caramelo salgado artesanal.',
        price: 1600,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 38
        title: 'Cappuccino de Nutella',
        description:
          'Café espresso, leite cremoso e Nutella, decorado com borda de Nutella.',
        price: 1600,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 39
        title: 'Cappuccino de Pistache',
        description:
          'Café espresso, leite cremoso e brigadeiro de pistache, decorado com borda de brigadeiro de pistache.',
        price: 1800,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 40
        title: 'Cappuccino com Leite Vegetal',
        description: 'Café espresso e leite vegetal Naveia®',
        price: 1800,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 41
        title: 'Docinho Tradicional',
        price: 400,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 42
        title: 'Brigadeiro Kinder',
        price: 500,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 43
        title: 'Bombom e Trufa',
        price: 500,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 44
        title: 'Caramelado',
        description:
          'Ouriço - beijinho de coco caramelado envolto por coco queimado.',
        price: 500,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 45
        title: 'Bala Baiana',
        description: 'Beijinho de coco caramelado embalado no papel celofane.',
        price: 600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 46
        title: 'Cenourella',
        description:
          'Bolinho individual com massa fofinha de cenoura recheado e coberto com Nutella.',
        price: 650,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 47
        title: 'Bombom de Morango',
        description:
          'Brigadeiro branco recheado de morango e banhado no chocolate.',
        price: 750,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 48
        title: 'Surpresa de Uva',
        description:
          'Brigadeiro branco recheado com uva Thompson sem sementes coberto com flakes de chocolate ao leite.',
        price: 750,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 49
        title: 'Pão de Mel',
        description:
          'Massa fofinha de pão de mel banhado no chocolate, recheado de doce de leite, beijinho ou brigadeiro.',
        price: 800,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 50
        title: 'Palha Italiana',
        description:
          'Brigadeiro cremoso com bolacha de maisena, envolto de leite ninho.',
        price: 800,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 51
        title: 'Torta Fatia da Semana',
        description: '(Consulte a disponibilidade de sabores)',
        price: 1000,
        portion: 'cada 100g',
        sectionId: sections[5].id,
      },
      {
        // 52
        title: 'Bolo Gelado',
        price: 1000,
        portion: 'cada 100g',
        sectionId: sections[5].id,
      },
      {
        // 53
        title: 'Bolo no Pote Maria Valentina',
        description:
          'Pão de ló branco, recheio de creme de leite ninho, brigadeiro cremoso e chantilly',
        price: 1200,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 54
        title: 'Chiffon no pote',
        description:
          'Pão de ló de chocolate com recheio e cobertura de mousse de chocolate chiffon.',
        price: 1200,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 55
        title: 'Cupcake Red Velvet',
        description:
          'Massa aveludada vermelha com recheio e cobertura de creme doce a base de cream cheese e baunilha.',
        price: 1400,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 56
        title: 'Torta Holandesa no Porte',
        description:
          'Base de bolacha amanteigada com creme especial de chocolate branco, ganache de chocolate meio amargo e bolacha calipso.',
        price: 1400,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 57
        title: 'Brownie Recheado',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 58
        title: 'Cheesecake de Frutas Vermelhas',
        description:
          'Base de bolacha amanteigada com creme de cream cheese doce e geleia de frutas vermelhas.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 59
        title: 'Casquinha de Limão',
        description:
          'Massa amanteigada tipo sablée, recheio de mousse de limão com cobertura de marshmallow.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 60
        title: 'Casquinha de Morango',
        description:
          'Massa amanteigada tipo sablée, recheio de creme pâtisserie, morangos e pistache decorando.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 61
        title: 'Casquinha de Sucrée',
        description:
          'Massa amanteigada de chocolate tipo sucrée, recheio de trufa de chocolate meio amargo e mousse de chocolate.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 62
        title: 'Casquinha de Uva',
        description:
          'Massa amanteigada tipo sablée, recheio de brigadeiro branco e ganache de chocolate ao leite, decorada com uvas thompson sem semente e amêndoas laminadas.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 63
        title: 'Casquinha de Brigadeiro Belga',
        description:
          'Massa amanteigada tipo sablée, recheio de brigadeiro belga, decorado com brigadeiro e flakes de chocolate ao leite.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 64
        title: 'Fatia Chocolatudo Belga',
        description:
          'Massa 50% cacau com cobertura de brigadeiro trufado. Servido Quentinho!',
        price: 1600,
        portion: 'a fatia',
        sectionId: sections[5].id,
      },
      {
        // 65
        title: 'Mini Bolo Surpresa Ninho com Nutella',
        description:
          'Massa 50% cacau com recheio de Nutella e cobertura e brigadeiro de leite ninho. Servido Quentinho!',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 66
        title: 'Banoffee',
        description:
          'Base de bolacha amanteigada, ganache de doce de leite, banana prata in natura, creme de leite ninho e farofinha crocante de canela.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 67
        title: 'Red Velvet',
        description:
          'Camadas de massa aveludada vermelha com recheio de creme doce a base de cream cheese e baunilha.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 68
        title: 'Morango',
        description: 'Brigadeiro de leite ninho, morangos fatiados e Nutella.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 69
        title: 'Brownie Ninho com Nutella',
        description:
          'Camadas de brownie, recheio de brigadeiro de leite ninho e Nutella.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 70
        title: 'Kinder Duo',
        description:
          'Camadas de pão de ló de chocolate, recheio de mousse de chocolate e brigadeiro branco.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 71
        title: 'Quatro Leites com Abacaxi e Ninho',
        description:
          'Camadas de pão de ló branco, recheio de quatro leites, creme de leite ninho e compota artesanal de abacaxi.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 72
        title: 'Frutas Vermelhas com Cream Cheese',
        description:
          'Camadas de pão de ló branco, recheio de geleia de frutas vermelhas e creme doce a base de cream cheese e baunilha.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 73
        title: 'Surpresa Ninho com Nutella',
        description:
          'Camadas de bolo 50% cacau, recheio de brigadeiro de leite ninho e Nutella.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 74
        title: 'Ninho Trufado',
        description:
          'Camadas de pão de ló branco, mousse de leite ninho e ganache de chocolate.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 75
        title: 'Pistache',
        description:
          'Camadas de pão de ló branco, brigadeiro branco, crumble de pistache e brigadeiro cremoso de pistache.',
        price: 2200,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
    ],
  });

  const flavors = await prisma.dishFlavors.createManyAndReturn({
    data: [
      {
        //0
        title: 'Empada de Frango',
        label: 'Frango',
        dishId: dishes[1].id,
      },
      {
        //1
        title: 'Empada de Palmito',
        label: 'Palmito',
        dishId: dishes[1].id,
      },
      {
        //2
        title: 'Empada de Frango com Palmito',
        label: 'Frango com Palmito',
        dishId: dishes[1].id,
      },
      {
        //3
        title: 'Água Mineral Sem Gás',
        label: 'Sem Gás',
        dishId: dishes[12].id,
      },
      {
        //4
        title: 'Água Mineral Com Gás',
        label: 'Com Gás',
        dishId: dishes[12].id,
      },
      {
        //5
        title: 'Docinho Tradicional de Brigadeiro',
        label: 'Brigadeiro',
        dishId: dishes[41].id,
      },
      {
        //6
        title: 'Docinho Tradicional de Brigadeiro de Churros',
        label: 'Brigadeiro de Churros',
        dishId: dishes[41].id,
      },
      {
        //7
        title: 'Docinho Tradicional de Leite Ninho',
        label: 'Brigadeiro de Leite Ninho',
        dishId: dishes[41].id,
      },
      {
        //8
        title: 'Docinho Tradicional de Leite Ninho com Nutella',
        label: 'Brigadeiro de Leite Ninho com Nutella',
        dishId: dishes[41].id,
      },
      {
        //9
        title: 'Palha Italiana de Brigadeiro Tradicional',
        label: 'Brigadeiro Tradicional',
        dishId: dishes[50].id,
      },
      {
        //10
        title: 'Palha Italiana de Brigadeiro de Leite Ninho + Brigadeiro',
        label: 'Brigadeiro de Leite Ninho + Brigadeiro',
        dishId: dishes[50].id,
      },
      {
        //11
        title: 'Palha Italiana Oreo',
        label: 'Oreo',
        description:
          'Brigadeiro belga recheado com bolacha oreo envolto com flakes de chocolate ao leite.',
        dishId: dishes[50].id,
      },
      {
        //12
        title: 'Bolo Gelado de Chocomousse',
        label: 'Chocomousse',
        dishId: dishes[52].id,
      },
      {
        //13
        title: 'Bolo Gelado de Ninho Trufado',
        label: 'Ninho Trufado',
        dishId: dishes[52].id,
      },
      {
        //14
        title: 'Bolo Gelado de Coco com Leite Condensado',
        label: 'Coco com Leite Condensado',
        dishId: dishes[52].id,
      },
      {
        //15
        title: 'Bolo Gelado de Ninhotella',
        label: 'Ninhotella',
        dishId: dishes[52].id,
      },
      {
        //16
        title: 'Bolo Gelado de Leite Ninho',
        label: 'Leite ninho',
        dishId: dishes[52].id,
      },
      {
        //17
        title: 'Bolo Gelado de Chocolate com Cocada Cremosa',
        label: 'Chocolate com Cocada Cremosa',
        dishId: dishes[52].id,
      },
      {
        //18
        title: 'Brownie de Ninho com Nutella',
        label: 'Ninho com Nutella',
        dishId: dishes[57].id,
      },
      {
        //19
        title: 'Brownie de Brigadeiro Duo',
        label: 'Brigadeiro Duo',
        dishId: dishes[57].id,
      },
      {
        //20
        title: 'Brownie de Brigadeiro ao Leite',
        label: 'Brigadeiro ao Leite',
        dishId: dishes[57].id,
      },
    ],
  });

  await prisma.dishExtras.createMany({
    data: [
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[29].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[30].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[31].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[32].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[33].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[34].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[35].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[36].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[37].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[38].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[39].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[40].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[29].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[30].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[31].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[32].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[33].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[34].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[35].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[36].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[37].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[38].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[39].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[40].id,
      },
    ],
  });

  await prisma.dishSpecsDishes.createMany({
    data: [
      {
        dishId: dishes[23].id,
        dishSpecsId: dishSpecs[0].id,
      },
      {
        dishId: dishes[35].id,
        dishSpecsId: dishSpecs[0].id,
      },
      {
        dishId: dishes[75].id,
        dishSpecsId: dishSpecs[0].id,
      },
      {
        dishId: dishes[23].id,
        dishSpecsId: dishSpecs[1].id,
      },
      {
        dishId: dishes[24].id,
        dishSpecsId: dishSpecs[1].id,
      },
      {
        dishId: dishes[25].id,
        dishSpecsId: dishSpecs[1].id,
      },
      {
        dishId: dishes[26].id,
        dishSpecsId: dishSpecs[1].id,
      },
      {
        dishId: dishes[27].id,
        dishSpecsId: dishSpecs[1].id,
      },
      {
        dishId: dishes[28].id,
        dishSpecsId: dishSpecs[1].id,
      },
      {
        dishId: dishes[29].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[30].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[31].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[32].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[33].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[34].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[35].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[36].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[37].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[38].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[39].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[40].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[57].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[64].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[65].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[69].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[73].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[40].id,
        dishSpecsId: dishSpecs[3].id,
      },
    ],
  });

  await prisma.media.createMany({
    data: [
      {
        title: slugify(dishes[0].title),
        type: 'image',
        referenceId: dishes[0].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0200.jpg',
      },
      {
        title: slugify(dishes[12].title),
        type: 'image',
        referenceId: dishes[12].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0203.jpg',
      },
      {
        title: slugify(dishes[16].title),
        type: 'image',
        referenceId: dishes[16].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0002.jpg',
      },
      {
        title: slugify(dishes[20].title),
        type: 'image',
        referenceId: dishes[20].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0003.jpg',
      },
      {
        title: slugify(dishes[25].title),
        type: 'image',
        referenceId: dishes[25].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0005.jpg',
      },
      {
        title: slugify(dishes[25].title),
        type: 'image',
        referenceId: dishes[25].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0007.jpg',
      },
      {
        title: slugify(dishes[28].title),
        type: 'image',
        referenceId: dishes[28].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0006.jpg',
      },
      {
        title: slugify(dishes[26].title),
        type: 'image',
        referenceId: dishes[26].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0008.jpg',
      },
      {
        title: slugify(dishes[23].title),
        type: 'image',
        referenceId: dishes[23].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0009.jpg',
      },
      {
        title: slugify(dishes[24].title),
        type: 'image',
        referenceId: dishes[24].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0010.jpg',
      },
      {
        title: slugify(dishes[24].title),
        type: 'image',
        referenceId: dishes[24].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0011.jpg',
      },
      {
        title: slugify(dishes[39].title),
        type: 'image',
        referenceId: dishes[39].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0012.jpg',
      },
      {
        title: slugify(dishes[37].title),
        type: 'image',
        referenceId: dishes[37].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0013.jpg',
      },
      {
        title: slugify(dishes[38].title),
        type: 'image',
        referenceId: dishes[38].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0014.jpg',
      },
      {
        title: slugify(dishes[35].title),
        type: 'image',
        referenceId: dishes[35].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0015.jpg',
      },
      {
        title: slugify(dishes[34].title),
        type: 'image',
        referenceId: dishes[34].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0016.jpg',
      },
      {
        title: slugify(dishes[53].title),
        type: 'image',
        referenceId: dishes[53].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0017.jpg',
      },
      {
        title: slugify(dishes[53].title),
        type: 'image',
        referenceId: dishes[53].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0020.jpg',
      },
      {
        title: slugify(dishes[54].title),
        type: 'image',
        referenceId: dishes[54].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0018.jpg',
      },
      {
        title: slugify(dishes[54].title),
        type: 'image',
        referenceId: dishes[54].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0021.jpg',
      },
      {
        title: slugify(dishes[69].title),
        type: 'image',
        referenceId: dishes[69].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0019.jpg',
      },
      {
        title: slugify(dishes[69].title),
        type: 'image',
        referenceId: dishes[69].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0022.jpg',
      },
      {
        title: slugify(dishes[73].title),
        type: 'image',
        referenceId: dishes[73].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0023.jpg',
      },
      {
        title: slugify(dishes[73].title),
        type: 'image',
        referenceId: dishes[73].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0024.jpg',
      },
      {
        title: slugify(dishes[67].title),
        type: 'image',
        referenceId: dishes[67].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0025.jpg',
      },
      {
        title: slugify(dishes[67].title),
        type: 'image',
        referenceId: dishes[67].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0026.jpg',
      },
      {
        title: slugify(dishes[70].title),
        type: 'image',
        referenceId: dishes[70].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0027.jpg',
      },
      {
        title: slugify(dishes[70].title),
        type: 'image',
        referenceId: dishes[70].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0028.jpg',
      },
      {
        title: slugify(dishes[70].title),
        type: 'image',
        referenceId: dishes[70].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0029.jpg',
      },
      {
        title: slugify(dishes[74].title),
        type: 'image',
        referenceId: dishes[74].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0030.jpg',
      },
      {
        title: slugify(dishes[74].title),
        type: 'image',
        referenceId: dishes[74].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0031.jpg',
      },
      {
        title: slugify(dishes[71].title),
        type: 'image',
        referenceId: dishes[71].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0032.jpg',
      },
      {
        title: slugify(dishes[71].title),
        type: 'image',
        referenceId: dishes[71].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0033.jpg',
      },
      {
        title: slugify(dishes[75].title),
        type: 'image',
        referenceId: dishes[75].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0034.jpg',
      },
      {
        title: slugify(dishes[75].title),
        type: 'image',
        referenceId: dishes[75].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0035.jpg',
      },
      {
        title: slugify(dishes[68].title),
        type: 'image',
        referenceId: dishes[68].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0036.jpg',
      },
      {
        title: slugify(dishes[68].title),
        type: 'image',
        referenceId: dishes[68].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0037.jpg',
      },
      {
        title: slugify(dishes[72].title),
        type: 'image',
        referenceId: dishes[72].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0038.jpg',
      },
      {
        title: slugify(dishes[72].title),
        type: 'image',
        referenceId: dishes[72].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0039.jpg',
      },
      {
        title: slugify(dishes[56].title),
        type: 'image',
        referenceId: dishes[56].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0040.jpg',
      },
      {
        title: slugify(dishes[56].title),
        type: 'image',
        referenceId: dishes[56].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0041.jpg',
      },
      {
        title: slugify(dishes[66].title),
        type: 'image',
        referenceId: dishes[66].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0042.jpg',
      },
      {
        title: slugify(flavors[16].title),
        type: 'image',
        referenceId: flavors[16].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0043.jpg',
      },
      {
        title: slugify(flavors[16].title),
        type: 'image',
        referenceId: flavors[16].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0044.jpg',
      },
      {
        title: slugify(flavors[12].title),
        type: 'image',
        referenceId: flavors[12].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0045.jpg',
      },
      {
        title: slugify(flavors[12].title),
        type: 'image',
        referenceId: flavors[12].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0046.jpg',
      },
      {
        title: slugify(flavors[17].title),
        type: 'image',
        referenceId: flavors[17].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0047.jpg',
      },
      {
        title: slugify(flavors[13].title),
        type: 'image',
        referenceId: flavors[13].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0048.jpg',
      },
      {
        title: slugify(flavors[13].title),
        type: 'image',
        referenceId: flavors[13].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0049.jpg',
      },
      {
        title: slugify(flavors[17].title),
        type: 'image',
        referenceId: flavors[17].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0050.jpg',
      },
      {
        title: slugify(flavors[14].title),
        type: 'image',
        referenceId: flavors[14].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0051.jpg',
      },
      {
        title: slugify(flavors[14].title),
        type: 'image',
        referenceId: flavors[14].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0053.jpg',
      },
      {
        title: slugify(flavors[15].title),
        type: 'image',
        referenceId: flavors[15].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0052.jpg',
      },
      {
        title: slugify(dishes[52].title),
        type: 'image',
        referenceId: dishes[52].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0054.jpg',
      },
      {
        title: slugify(dishes[55].title),
        type: 'image',
        referenceId: dishes[55].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0086.jpg',
      },
      {
        title: slugify(dishes[6].title),
        type: 'image',
        referenceId: dishes[6].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0088.jpg',
      },
      {
        title: slugify(dishes[6].title),
        type: 'image',
        referenceId: dishes[6].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0087.jpg',
      },
      {
        title: slugify(dishes[5].title),
        type: 'image',
        referenceId: dishes[5].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0089.jpg',
      },
      {
        title: slugify(dishes[5].title),
        type: 'image',
        referenceId: dishes[5].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0090.jpg',
      },
      {
        title: slugify(flavors[0].title),
        type: 'image',
        referenceId: flavors[0].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0091.jpg',
      },
      {
        title: slugify(dishes[1].title),
        type: 'image',
        referenceId: dishes[1].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0092.jpg',
      },
      {
        title: slugify(flavors[1].title),
        type: 'image',
        referenceId: flavors[1].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0092.jpg',
      },
      {
        title: slugify(dishes[4].title),
        type: 'image',
        referenceId: dishes[4].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0094.jpg',
      },
      {
        title: slugify(dishes[4].title),
        type: 'image',
        referenceId: dishes[4].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0093.jpg',
      },
      {
        title: slugify(dishes[3].title),
        type: 'image',
        referenceId: dishes[3].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0096.jpg',
      },
      {
        title: slugify(dishes[3].title),
        type: 'image',
        referenceId: dishes[3].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0095.jpg',
      },
      {
        title: slugify(dishes[7].title),
        type: 'image',
        referenceId: dishes[7].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0097.jpg',
      },
      {
        title: slugify(dishes[2].title),
        type: 'image',
        referenceId: dishes[2].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0099.jpg',
      },
      {
        title: slugify(dishes[2].title),
        type: 'image',
        referenceId: dishes[2].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0098.jpg',
      },
      {
        title: slugify(dishes[10].title),
        type: 'image',
        referenceId: dishes[10].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0100.jpg',
      },
      {
        title: slugify(dishes[10].title),
        type: 'image',
        referenceId: dishes[10].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0101.jpg',
      },
      {
        title: slugify(dishes[11].title),
        type: 'image',
        referenceId: dishes[11].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0102.jpg',
      },
      {
        title: slugify(dishes[11].title),
        type: 'image',
        referenceId: dishes[11].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0103.jpg',
      },
      {
        title: slugify(dishes[8].title),
        type: 'image',
        referenceId: dishes[8].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0104.jpg',
      },
      {
        title: slugify(dishes[9].title),
        type: 'image',
        referenceId: dishes[9].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0106.jpg',
      },
      {
        title: slugify(dishes[9].title),
        type: 'image',
        referenceId: dishes[9].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0105.jpg',
      },
      {
        title: slugify(dishes[58].title),
        type: 'image',
        referenceId: dishes[58].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0109.jpg',
      },
      {
        title: slugify(dishes[60].title),
        type: 'image',
        referenceId: dishes[60].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0111.jpg',
      },
      {
        title: slugify(dishes[61].title),
        type: 'image',
        referenceId: dishes[61].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0112.jpg',
      },
      {
        title: slugify(dishes[62].title),
        type: 'image',
        referenceId: dishes[62].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0113.jpg',
      },
      {
        title: slugify(dishes[63].title),
        type: 'image',
        referenceId: dishes[63].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0114.jpg',
      },
      {
        title: slugify(dishes[63].title),
        type: 'image',
        referenceId: dishes[63].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0115.jpg',
      },
      {
        title: slugify(dishes[57].title),
        type: 'image',
        referenceId: dishes[57].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0121.jpg',
      },
      {
        title: slugify(flavors[20].title),
        type: 'image',
        referenceId: flavors[20].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0117.jpg',
      },
      {
        title: slugify(flavors[19].title),
        type: 'image',
        referenceId: flavors[19].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0119.jpg',
      },
      {
        title: slugify(flavors[18].title),
        type: 'image',
        referenceId: flavors[18].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0120.jpg',
      },
      {
        title: slugify(dishes[46].title),
        type: 'image',
        referenceId: dishes[46].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0124.jpg',
      },
      {
        title: slugify(dishes[46].title),
        type: 'image',
        referenceId: dishes[46].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0125.jpg',
      },
      {
        title: slugify(dishes[41].title),
        type: 'image',
        referenceId: dishes[41].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0127.jpg',
      },
      {
        title: slugify(dishes[42].title),
        type: 'image',
        referenceId: dishes[42].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0126.jpg',
      },
      {
        title: slugify(dishes[42].title),
        type: 'image',
        referenceId: dishes[42].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0128.jpg',
      },
      {
        title: slugify(dishes[47].title),
        type: 'image',
        referenceId: dishes[47].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0129.jpg',
      },
      {
        title: slugify(dishes[47].title),
        type: 'image',
        referenceId: dishes[47].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0130.jpg',
      },
      {
        title: slugify(dishes[47].title),
        type: 'image',
        referenceId: dishes[47].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0131.jpg',
      },
      {
        title: slugify(dishes[48].title),
        type: 'image',
        referenceId: dishes[48].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0132.jpg',
      },
      {
        title: slugify(dishes[48].title),
        type: 'image',
        referenceId: dishes[48].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0135.jpg',
      },
      {
        title: slugify(dishes[45].title),
        type: 'image',
        referenceId: dishes[45].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0133.jpg',
      },
      {
        title: slugify(dishes[45].title),
        type: 'image',
        referenceId: dishes[45].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0134.jpg',
      },
      {
        title: slugify(dishes[43].title),
        type: 'image',
        referenceId: dishes[43].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0137.jpg',
      },
      {
        title: slugify(flavors[3].title),
        type: 'image',
        referenceId: flavors[3].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0201.jpg',
      },
      {
        title: slugify(flavors[4].title),
        type: 'image',
        referenceId: flavors[4].id,
        referenceName: 'flavors',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0202.jpg',
      },
      {
        title: slugify(dishes[13].title),
        type: 'image',
        referenceId: dishes[13].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0204.jpg',
      },
      {
        title: slugify(dishes[14].title),
        type: 'image',
        referenceId: dishes[14].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0205.jpg',
      },
      {
        title: slugify(dishes[15].title),
        type: 'image',
        referenceId: dishes[15].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0206.jpg',
      },
      {
        title: slugify(dishes[17].title),
        type: 'image',
        referenceId: dishes[17].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0207.jpg',
      },
      {
        title: slugify(dishes[18].title),
        type: 'image',
        referenceId: dishes[18].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0208.jpg',
      },
      {
        title: slugify(dishes[19].title),
        type: 'image',
        referenceId: dishes[19].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0209.jpg',
      },
      {
        title: slugify(dishes[27].title),
        type: 'image',
        referenceId: dishes[27].id,
        referenceName: 'dishes',
        filename: 'https://www.cdn-parachute.com.br/IMG-20250113-WA0210.jpg',
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
