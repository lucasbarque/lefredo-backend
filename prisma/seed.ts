import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  await prisma.media.deleteMany();
  await prisma.dishSpecsDishes.deleteMany();
  await prisma.dishExtras.deleteMany();
  await prisma.dishSpecs.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.baseDishes.deleteMany();
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

  const baseDishes = await prisma.baseDishes.createManyAndReturn({
    data: [
      {
        title: 'Empada',
      },
      {
        title: 'Água Mineral',
      },
      {
        title: 'Docinho Tradicional',
      },
      {
        title: 'Palha Italiana',
      },
      {
        title: 'Bolo Gelado',
      },
      {
        title: 'Brownie Recheado',
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
        title: 'Empada de Frango',
        price: 1400,
        portion: '01 unidade',
        sectionId: sections[0].id,
        baseDisheId: baseDishes[0].id,
      },
      {
        // 2
        title: 'Empada de Palmito',
        price: 1400,
        portion: '01 unidade',
        sectionId: sections[0].id,
        baseDisheId: baseDishes[0].id,
      },
      {
        // 3
        title: 'Empada de Frango com Palmito',
        price: 1400,
        portion: '01 unidade',
        sectionId: sections[0].id,
        baseDisheId: baseDishes[0].id,
      },
      {
        // 4
        title: 'Coxinha de Frango',
        description:
          'Massa de mandioca com recheio de frango com catupiry, empanada na farinha panko.',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 5
        title: 'Bauru',
        description:
          'Massa semifolhada recheada com presunto, queijo muçarela, tomate, orégano e requeijão cremoso.',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 6
        title: 'Tortinha Pantaneira',
        description:
          'Massa folhada, recheada com carne seca, catupiry e banana da terra.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 7
        title: 'Empada Especial de Camarão',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 8
        title: 'Quiche de Queijo brie com damasco',
        price: 1800,
        portion: 'a fatia',
        sectionId: sections[0].id,
      },
      {
        // 9
        title: 'Folhado de Calabresa',
        description:
          'Massa semifolhada com recheio de calabresa, cebola caramelizada, muçarela e catupiry finalizado com queijo parmesão.',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[0].id,
      },
      {
        // 10
        title: 'Queijo Quente',
        description:
          'Pão italiano de fermentação natural, requeijão, muçarela e parmesão.',
        price: 2200,
        prepTime: 20,
        sectionId: sections[1].id,
      },
      {
        // 11
        title: 'Croque Monsieur',
        description:
          'Pão de forma artesanal, manteiga, presunto, muçarela, molho bechamel e parmesão gratinado no forno.',
        price: 2400,
        prepTime: 20,
        sectionId: sections[1].id,
      },
      {
        // 12
        title: 'Panini da Casa',
        description:
          'Pão brioche artesanal, presunto, muçarela, tomate e requeijão, servido quentinho.',
        price: 2400,
        prepTime: 20,
        sectionId: sections[1].id,
      },
      {
        // 13
        title: 'Panini Itália',
        description:
          'Pão italiano de fermentação natural, molho pesto, muçarela de búfala, presunto de parma, rúcula, tomate e requeijão, servido frio.',
        price: 3200,
        prepTime: 20,
        sectionId: sections[1].id,
      },
      {
        // 14
        title: 'Água Mineral Sem Gás',
        price: 600,
        portion: 'pet 500ml',
        sectionId: sections[2].id,
        baseDisheId: baseDishes[1].id,
      },
      {
        // 15
        title: 'Água Mineral Com Gás',
        price: 600,
        portion: 'pet 500ml',
        sectionId: sections[2].id,
        baseDisheId: baseDishes[1].id,
      },
      {
        // 16
        title: 'Refrigerante',
        price: 700,
        portion: 'lata 350ml',
        sectionId: sections[2].id,
      },
      {
        // 17
        title: 'Refrigerante Mini',
        price: 400,
        portion: 'lata 220ml',
        sectionId: sections[2].id,
      },
      {
        // 18
        title: 'Suco Del Vale',
        price: 700,
        portion: 'lata 290ml',
        sectionId: sections[2].id,
      },
      {
        // 19
        title: 'Chá Matte Leão com Limão',
        price: 1000,
        portion: 'copo 400ml',
        sectionId: sections[2].id,
      },
      {
        // 20
        title: 'Wewi Tônica Rosé',
        price: 1000,
        portion: 'garrafa 255ml',
        sectionId: sections[2].id,
      },
      {
        // 21
        title: 'Wewi Tônica Tangerina',
        price: 1000,
        portion: 'garrafa 255ml',
        sectionId: sections[2].id,
      },
      {
        // 22
        title: 'Wewi Tea Soda',
        price: 1000,
        portion: 'garrafa 255ml',
        sectionId: sections[2].id,
      },
      {
        // 23
        title: 'Suco de Laranja',
        price: 1000,
        portion: 'copo 400ml',
        sectionId: sections[2].id,
      },
      {
        // 24
        title: 'Suco de Laranja com Morango',
        price: 1400,
        portion: 'copo 400ml',
        sectionId: sections[2].id,
      },
      {
        // 25
        title: 'Soda Italiana',
        description: '(Consulte a disponibilidade de sabores)',
        price: 1400,
        portion: 'copo 365ml',
        sectionId: sections[2].id,
      },
      {
        // 26
        title: 'Ice Cappuccino',
        description:
          'Nosso famoso capuccino da casa, na versão geladinha! Leite, café canela, cacau e chantilly.',
        price: 2000,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 27
        title: 'Ice Latte Caramelo',
        description:
          'Caramelo salgado artesanal, leite, café, gelo e crema do leite.',
        price: 2000,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 28
        title: 'Frapê de Nutella',
        description: 'Leite, café espresso, Nutella e chantilly.',
        price: 2200,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 29
        title: 'Frapê de Ovomaltine',
        description: 'Leite, café espresso, Ovomaltine e chantilly.',
        price: 2200,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 30
        title: 'Frapê de Doce de Leite com Paçoca',
        description: 'Leite, café espresso, doce de leite, paçoca e chantilly.',
        price: 2200,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 31
        title: 'Frapê de Red Velvet',
        description:
          'Leite, morango, cream cheese, geleia de frutas vermelhas artesanal e chantilly.',
        price: 2600,
        portion: '300ml',
        sectionId: sections[3].id,
      },
      {
        // 32
        title: 'Café Curto',
        price: 800,
        portion: '30ml',
        sectionId: sections[4].id,
      },
      {
        // 33
        title: 'Café Espresso Simples',
        price: 800,
        portion: '50ml',
        sectionId: sections[4].id,
      },
      {
        // 34
        title: 'Café Espresso Duplo',
        price: 1200,
        portion: '100ml',
        sectionId: sections[4].id,
      },
      {
        // 35
        title: 'Café Macchiatto Simples',
        description: 'Café espresso e espuma do leite.',
        price: 1000,
        portion: '50ml',
        sectionId: sections[4].id,
      },
      {
        // 36
        title: 'Café Macchiatto Duplo',
        description: 'Café espresso e espuma do leite.',
        price: 1400,
        portion: '100ml',
        sectionId: sections[4].id,
      },
      {
        // 37
        title: 'Mocha',
        description: 'Café espresso, leite cremoso e ganache de chocolate.',
        price: 1600,
        portion: '',
        sectionId: sections[4].id,
      },
      {
        // 38
        title: 'Cappuccino da Casa',
        description: 'Mistura cremosa e artesanal da casa. Já vem adoçado!',
        price: 1400,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 39
        title: 'Cappuccino Italiano',
        description: 'Receita tradicional de leite, café e espuma do leite.',
        price: 1400,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 40
        title: 'Cappuccino Caramelo',
        description:
          'Café espresso, leite cremoso e caramelo salgado artesanal.',
        price: 1600,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 41
        title: 'Cappuccino de Nutella',
        description:
          'Café espresso, leite cremoso e Nutella, decorado com borda de Nutella.',
        price: 1600,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 42
        title: 'Cappuccino de Pistache',
        description:
          'Café espresso, leite cremoso e brigadeiro de pistache, decorado com borda de brigadeiro de pistache.',
        price: 1800,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 43
        title: 'Cappuccino com Leite Vegetal',
        description: 'Café espresso e leite vegetal Naveia®',
        price: 1800,
        portion: '180ml',
        sectionId: sections[4].id,
      },
      {
        // 44
        title: 'Docinho Tradicional de Brigadeiro',
        price: 400,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[2].id,
      },
      {
        // 45
        title: 'Docinho Tradicional de Brigadeiro de churros',
        price: 400,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[2].id,
      },
      {
        // 46
        title: 'Docinho Tradicional de Brigadeiro de leite ninho',
        price: 400,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[2].id,
      },
      {
        // 47
        title: 'Docinho Tradicional de Brigadeiro de leite ninho com Nutella',
        price: 400,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[2].id,
      },
      {
        // 48
        title: 'Brigadeiro Kinder',
        description: 'uni.',
        price: 500,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 49
        title: 'Bombom e Trufa',
        description: 'uni.',
        price: 500,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 50
        title: 'Caramelado',
        description:
          'Ouriço - beijinho de coco caramelado envolto por coco queimado.',
        price: 500,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 51
        title: 'Bala Baiana',
        description: 'Beijinho de coco caramelado embalado no papel celofane.',
        price: 600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 52
        title: 'Cenourella',
        description:
          'Bolinho individual com massa fofinha de cenoura recheado e coberto com Nutella.',
        price: 650,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 53
        title: 'Bombom de Morango',
        description:
          'Brigadeiro branco recheado de morango e banhado no chocolate.',
        price: 750,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 54
        title: 'Surpresa de Uva',
        description:
          'Brigadeiro branco recheado com uva Thompson sem sementes coberto com flakes de chocolate ao leite.',
        price: 750,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 55
        title: 'Pão de Mel',
        description:
          'Massa fofinha de pão de mel banhado no chocolate, recheado de doce de leite, beijinho ou brigadeiro.',
        price: 800,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 56
        title: 'Palha Italiana de Brigadeiro tradicional',
        description:
          'Brigadeiro cremoso com bolacha de maisena, envolto de leite ninho.',
        price: 800,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[3].id,
      },
      {
        // 57
        title: 'Palha Italiana de Brigadeiro de leite ninho + Brigadeiro',
        description:
          'Brigadeiro cremoso com bolacha de maisena, envolto de leite ninho.',
        price: 800,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[3].id,
      },
      {
        // 58
        title: 'Palha Italiana Oreo',
        description:
          'Brigadeiro belga recheado com bolacha oreo envolto com flakes de chocolate ao leite.',
        price: 800,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[3].id,
      },
      {
        // 59
        title: 'Torta Fatia da Semana',
        description: '(Consulte a disponibilidade de sabores)',
        price: 1000,
        portion: 'cada 100g',
        sectionId: sections[5].id,
      },
      {
        // 60
        title: 'Bolo Gelado de Chocomousse',
        price: 1000,
        portion: 'cada 100g',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[4].id,
      },
      {
        // 61
        title: 'Bolo Gelado de Ninho trufado',
        price: 1000,
        portion: 'cada 100g',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[4].id,
      },
      {
        // 62
        title: 'Bolo Gelado de Coco com leite condensado',
        price: 1000,
        portion: 'cada 100g',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[4].id,
      },
      {
        // 63
        title: 'Bolo Gelado de Ninhotella',
        price: 1000,
        portion: 'cada 100g',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[4].id,
      },
      {
        // 64
        title: 'Bolo Gelado de Leite ninho',
        price: 1000,
        portion: 'cada 100g',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[4].id,
      },

      {
        // 65
        title: 'Bolo Gelado de Chocolate com cocada cremosa',
        price: 1000,
        portion: 'cada 100g',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[4].id,
      },
      {
        // 66
        title: 'Bolo no Pote Maria Valentina',
        description:
          'Pão de ló branco, recheio de creme de leite ninho, brigadeiro cremoso e chantilly',
        price: 1200,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 67
        title: 'Chiffon no pote',
        description:
          'Pão de ló de chocolate com recheio e cobertura de mousse de chocolate chiffon.',
        price: 1200,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 68
        title: 'Cupcake Red Velvet',
        description:
          'Massa aveludada vermelha com recheio e cobertura de creme doce a base de cream cheese e baunilha.',
        price: 1400,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 69
        title: 'Torta Holandesa no Porte',
        description:
          'Base de bolacha amanteigada com creme especial de chocolate branco, ganache de chocolate meio amargo e bolacha calipso.',
        price: 1400,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 70
        title: 'Brownie Recheado de Ninho com Nutella',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[4].id,
      },
      {
        // 71
        title: 'Brownie Recheado de Brigadeiro Duo',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[4].id,
      },
      {
        // 72
        title: 'Brownie Recheado de Brigadeiro ao Leite',
        price: 1500,
        portion: '01 unidade',
        sectionId: sections[5].id,
        baseDisheId: baseDishes[4].id,
      },
      {
        // 73
        title: 'Cheesecake de Frutas Vermelhas',
        description:
          'Base de bolacha amanteigada com creme de cream cheese doce e geleia de frutas vermelhas.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 74
        title: 'Casquinha de Limão',
        description:
          'Massa amanteigada tipo sablée, recheio de mousse de limão com cobertura de marshmallow.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 75
        title: 'Casquinha de Morango',
        description:
          'Massa amanteigada tipo sablée, recheio de creme pâtisserie, morangos e pistache decorando.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 76
        title: 'Casquinha de Sucrée',
        description:
          'Massa amanteigada de chocolate tipo sucrée, recheio de trufa de chocolate meio amargo e mousse de chocolate.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 77
        title: 'Casquinha de Uva',
        description:
          'Massa amanteigada tipo sablée, recheio de brigadeiro branco e ganache de chocolate ao leite, decorada com uvas thompson sem semente e amêndoas laminadas.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 78
        title: 'Casquinha de Brigadeiro Belga',
        description:
          'Massa amanteigada tipo sablée, recheio de brigadeiro belga, decorado com brigadeiro e flakes de chocolate ao leite.',
        price: 1600,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 79
        title: 'Fatia Chocolatudo Belga',
        description:
          'Massa 50% cacau com cobertura de brigadeiro trufado. Servido Quentinho!',
        price: 1600,
        portion: 'a fatia',
        sectionId: sections[5].id,
      },
      {
        // 80
        title: 'Mini Bolo Surpresa Ninho com Nutella',
        description:
          'Massa 50% cacau com recheio de Nutella e cobertura e brigadeiro de leite ninho. Servido Quentinho!',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 81
        title: 'Banoffee',
        description:
          'Base de bolacha amanteigada, ganache de doce de leite, banana prata in natura, creme de leite ninho e farofinha crocante de canela.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[5].id,
      },
      {
        // 82
        title: 'Red Velvet',
        description:
          'Camadas de massa aveludada vermelha com recheio de creme doce a base de cream cheese e baunilha.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 83
        title: 'Morango',
        description: 'Brigadeiro de leite ninho, morangos fatiados e Nutella.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 84
        title: 'Brownie Ninho com Nutella',
        description:
          'Camadas de brownie, recheio de brigadeiro de leite ninho e Nutella.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 85
        title: 'Kinder Duo',
        description:
          'Camadas de pão de ló de chocolate, recheio de mousse de chocolate e brigadeiro branco.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 86
        title: 'Quatro Leites com Abacaxi e Ninho',
        description:
          'Camadas de pão de ló branco, recheio de quatro leites, creme de leite ninho e compota artesanal de abacaxi.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 87
        title: 'Frutas Vermelhas com Cream Cheese',
        description:
          'Camadas de pão de ló branco, recheio de geleia de frutas vermelhas e creme doce a base de cream cheese e baunilha.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 88
        title: 'Surpresa Ninho com Nutella',
        description:
          'Camadas de bolo 50% cacau, recheio de brigadeiro de leite ninho e Nutella.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 89
        title: 'Ninho Trufado',
        description:
          'Camadas de pão de ló branco, mousse de leite ninho e ganache de chocolate.',
        price: 1800,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
      {
        // 90
        title: 'Pistache',
        description:
          'Camadas de pão de ló branco, brigadeiro branco, crumble de pistache e brigadeiro cremoso de pistache.',
        price: 2200,
        portion: '01 unidade',
        sectionId: sections[6].id,
      },
    ],
  });

  await prisma.dishExtras.createMany({
    data: [
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
        title: 'Chantilly',
        price: 300,
        dishId: dishes[41].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[42].id,
      },
      {
        title: 'Chantilly',
        price: 300,
        dishId: dishes[43].id,
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
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[41].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[42].id,
      },
      {
        title: 'Borda de Nutella',
        price: 400,
        dishId: dishes[43].id,
      },
    ],
  });

  await prisma.dishSpecsDishes.createMany({
    data: [
      {
        dishId: dishes[26].id,
        dishSpecsId: dishSpecs[0].id,
      },
      {
        dishId: dishes[38].id,
        dishSpecsId: dishSpecs[0].id,
      },
      {
        dishId: dishes[90].id,
        dishSpecsId: dishSpecs[0].id,
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
        dishSpecsId: dishSpecs[1].id,
      },
      {
        dishId: dishes[30].id,
        dishSpecsId: dishSpecs[1].id,
      },
      {
        dishId: dishes[31].id,
        dishSpecsId: dishSpecs[1].id,
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
        dishId: dishes[41].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[42].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[43].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[70].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[71].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[72].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[79].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[80].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[84].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[88].id,
        dishSpecsId: dishSpecs[2].id,
      },
      {
        dishId: dishes[43].id,
        dishSpecsId: dishSpecs[3].id,
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
