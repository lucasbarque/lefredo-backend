import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.dishSpecsDishes.deleteMany();
  await prisma.dishExtras.deleteMany();
  await prisma.dishSpecs.deleteMany();
  await prisma.dishMedias.deleteMany();
  await prisma.dishFlavorsMedias.deleteMany();
  await prisma.dishFlavors.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.section.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurant.deleteMany();

  await prisma.restaurant.create({
    data: {
      id: 'eb191864-0395-4253-895c-91fa6d78b3cf',
      name: 'Niura Doceria',
      welcomeMessage:
        '<p><b>Olá,</b></p><p>Nosso cardápio foi elaborado com muito carinho pra você.</p>',
      logo: 'logo-store/eb191864-0395-4253-895c-91fa6d78b3cf.svg',
      slug: 'niura',
    },
  });

  await prisma.user.upsert({
    where: { email: 'lucasbarque@gmail.com' },
    update: {},
    create: {
      id: 'ab61d829-d4a7-4fda-8aad-fee83a9dc515',
      name: 'Lucas Barque da Silva',
      email: 'lucasbarque@gmail.com',
      restaurantId: 'eb191864-0395-4253-895c-91fa6d78b3cf',
      clerkId: 'user_2tN0ZUF4Z9Q1tYdXpJoaWiOXI7u',
      onboardingFinished: true,
    },
  });

  await prisma.menu.create({
    data: {
      id: 'ee749e3b-e35a-4ddf-8123-0a1976da8148',
      title: 'Geral',
      restaurantId: 'eb191864-0395-4253-895c-91fa6d78b3cf',
    },
  });

  await prisma.section.createMany({
    data: [
      {
        id: '73607a24-9af4-4cd5-ada7-6fd4b7d7450d',
        title: 'Salgados',
        slug: 'salgados',
        description:
          'Nosso estoque é renovado diariamente, portanto algumas opções podem se esgotar ao longo do dia. Favor verificar a disponibilidade do produto com nossos atendentes no momento do pedido!',
        menuId: 'ee749e3b-e35a-4ddf-8123-0a1976da8148',
        isActive: true,
      },
      {
        id: '8b7ff268-9f18-4784-8ea9-030aa5ed7be8',
        title: 'Panini e Sanduíches',
        slug: 'panini-e-sanduiches',
        description:
          'Nosso estoque é renovado diariamente, portanto algumas opções podem se esgotar ao longo do dia. Favor verificar a disponibilidade do produto com nossos atendentes no momento do pedido!',
        menuId: 'ee749e3b-e35a-4ddf-8123-0a1976da8148',
        isActive: true,
      },
      {
        id: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        title: 'Bebidas Geladas',
        slug: 'bebidas-geladas',
        menuId: 'ee749e3b-e35a-4ddf-8123-0a1976da8148',
        isActive: true,
      },
      {
        id: 'e7109d68-cd71-40f6-989e-6acc06a7be39',
        title: 'Frapês e Ice',
        slug: 'frapes-e-ice',
        description:
          'Nosso estoque é renovado diariamente, portanto algumas opções podem se esgotar ao longo do dia. Favor verificar a disponibilidade do produto com nossos atendentes no momento do pedido!',
        menuId: 'ee749e3b-e35a-4ddf-8123-0a1976da8148',
        isActive: true,
      },
      {
        id: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        title: 'Bebidas Quentes',
        slug: 'bebidas-quentes',
        description:
          'Café  moído na hora direto da região do Alto Mogiana na variedade Catuaí Amarelo',
        menuId: 'ee749e3b-e35a-4ddf-8123-0a1976da8148',
        isActive: true,
      },
      {
        id: '28adc859-8197-4a6c-8322-028d376dfe9b',
        title: 'Doces e Sobremesas',
        slug: 'doces-e-sobremesas',
        description:
          'Nosso estoque é renovado diariamente, portanto algumas opções podem se esgotar ao longo do dia. Favor verificar a disponibilidade do produto com nossos atendentes no momento do pedido!',
        menuId: 'ee749e3b-e35a-4ddf-8123-0a1976da8148',
        isActive: true,
      },
      {
        id: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        title: 'Cassatas',
        slug: 'cassatas',
        menuId: 'ee749e3b-e35a-4ddf-8123-0a1976da8148',
        isActive: true,
      },
    ],
  });

  await prisma.dishSpecs.createMany({
    data: [
      {
        id: '61df89fb-cbbd-47fd-9517-2ff0744fc95d',
        title: 'Mais pedido',
        description: '',
        key: 'highlighted',
      },
      {
        id: '6e7ae31d-5cc5-4eda-b980-600b6f417245',
        title: 'Vegetariano',
        description: 'Sem carne de nenhum tipo',
        key: 'vegetarian',
      },
      {
        id: '4b709494-3d5e-4a11-983f-e5dd153b510f',
        title: 'Zero lactose',
        description: 'Não contém lactose, ou seja, leite e seus derivados',
        key: 'lactfree',
      },
      {
        id: 'd99cc296-d309-4188-ba73-19f2b384a37b',
        title: 'Vegano',
        description: 'Sem produtos de origem animal, como carne, ovo ou leite',
        key: 'vegan',
      },
      {
        id: 'cd04b2e4-7094-4899-ad1f-dabc73c14a63',
        title: 'Servido Gelado',
        description: 'Da geladeira direto para o consumidor',
        key: 'cold',
      },
      {
        id: '5715d021-c992-471e-9fc4-eea0006f54bd',
        title: 'Servido Quente',
        description: 'Produto que acabou de sair do forno',
        key: 'hot',
      },
      {
        id: '72f4788b-97db-483b-a7e3-d76b0b8f096f',
        title: 'Orgânico',
        description: 'Cultivado sem agrotóxicos, segundo a lei 10.831',
        key: 'organic',
      },
      {
        id: '3ee5bb92-a3bc-4dc4-ba0d-94789cf6ad56',
        title: 'Sem açúcar',
        description:
          'Não contém nenhum tipo de açúcar (cristal, orgânico, mascavo, etc.)',
        key: 'suggarfree',
      },
      {
        id: '6dbaed54-2c08-4d62-b175-c60b5d4fadcc',
        title: 'Natural',
        description:
          'Não contém nenhum tipo de açúcar (cristal, orgânico, mascavo, etc.)',
        key: 'natural',
      },
    ],
  });

  await prisma.dish.createMany({
    data: [
      {
        id: '14562f5d-1d13-463b-9565-9335fba8bee7',
        title: 'Pão de Queijo',
        description: 'Porção com 4 unidades.',
        price: 1000,
        portion: '04 unidades',
        sectionId: '73607a24-9af4-4cd5-ada7-6fd4b7d7450d',
        isActive: true,
      },
      {
        id: '861c3103-2945-4c2c-a52b-eb7d52d40ba9',
        title: 'Empada',
        price: 1400,
        portion: '01 unidade',
        sectionId: '73607a24-9af4-4cd5-ada7-6fd4b7d7450d',
        isActive: true,
      },
      {
        id: '94f506f7-5c6f-44d7-8d88-a28494fb158b',
        title: 'Coxinha de Frango',
        description:
          'Massa de mandioca com recheio de frango com catupiry, empanada na farinha panko.',
        price: 1500,
        portion: '01 unidade',
        sectionId: '73607a24-9af4-4cd5-ada7-6fd4b7d7450d',
        isActive: true,
      },
      {
        id: '09cab1b3-49e5-455f-9ce4-36568e2aa894',
        title: 'Bauru',
        description:
          'Massa semifolhada recheada com presunto, queijo muçarela, tomate, orégano e requeijão cremoso.',
        price: 1500,
        portion: '01 unidade',
        sectionId: '73607a24-9af4-4cd5-ada7-6fd4b7d7450d',
        isActive: true,
      },
      {
        id: '8f500d73-ae4b-4842-9709-ffbe75fedfce',
        title: 'Tortinha Pantaneira',
        description:
          'Massa folhada, recheada com carne seca, catupiry e banana da terra.',
        price: 1800,
        portion: '01 unidade',
        sectionId: '73607a24-9af4-4cd5-ada7-6fd4b7d7450d',
        isActive: true,
      },
      {
        id: 'f087b95e-7807-485b-943d-a7512fd757e5',
        title: 'Empada Especial de Camarão',
        price: 1800,
        portion: '01 unidade',
        sectionId: '73607a24-9af4-4cd5-ada7-6fd4b7d7450d',
        isActive: true,
      },
      {
        id: 'e4d190ef-3496-4a0a-92b7-92ab654bf59f',
        title: 'Quiche de Queijo brie com damasco',
        price: 1800,
        portion: 'a fatia',
        sectionId: '73607a24-9af4-4cd5-ada7-6fd4b7d7450d',
        isActive: true,
      },
      {
        id: '78b2ee0a-6c0e-4ad4-931d-8271d2695041',
        title: 'Folhado de Calabresa',
        description:
          'Massa semifolhada com recheio de calabresa, cebola caramelizada, muçarela e catupiry finalizado com queijo parmesão.',
        price: 1500,
        portion: '01 unidade',
        sectionId: '73607a24-9af4-4cd5-ada7-6fd4b7d7450d',
        isActive: true,
      },
      {
        id: 'c2f4a5c8-36f6-4793-bff3-4f485db09b39',
        title: 'Queijo Quente',
        description:
          'Pão italiano de fermentação natural, requeijão, muçarela e parmesão.',
        portion: '01 unidade',
        price: 2200,
        prepTime: '20 Minutos',
        sectionId: '8b7ff268-9f18-4784-8ea9-030aa5ed7be8',
        isActive: true,
      },
      {
        id: '728b0aa4-4c86-4b47-af68-446c684727a4',
        title: 'Croque Monsieur',
        description:
          'Pão de forma artesanal, manteiga, presunto, muçarela, molho bechamel e parmesão gratinado no forno.',
        price: 2400,
        portion: '01 unidade',
        prepTime: '20 Minutos',
        sectionId: '8b7ff268-9f18-4784-8ea9-030aa5ed7be8',
        isActive: true,
      },
      {
        id: '593df557-94d6-45de-be44-575d37f9552b',
        title: 'Panini da Casa',
        description:
          'Pão brioche artesanal, presunto, muçarela, tomate e requeijão, servido quentinho.',
        price: 2400,
        portion: '01 unidade',
        prepTime: '20 Minutos',
        sectionId: '8b7ff268-9f18-4784-8ea9-030aa5ed7be8',
        isActive: true,
      },
      {
        id: '799be580-038f-46ce-9f8e-286e43348a5c',
        title: 'Panini Itália',
        description:
          'Pão italiano de fermentação natural, molho pesto, muçarela de búfala, presunto de parma, rúcula, tomate e requeijão, servido frio.',
        price: 3200,
        portion: '01 unidade',
        prepTime: '20 Minutos',
        sectionId: '8b7ff268-9f18-4784-8ea9-030aa5ed7be8',
        isActive: true,
      },
      {
        id: '55302d68-2678-45c7-a1d7-18ec19d21108',
        title: 'Água Mineral',
        price: 600,
        portion: 'pet 500ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: '79a73421-67b6-409c-839a-f3e1231fb26e',
        title: 'Refrigerante',
        price: 700,
        portion: 'lata 350ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: '842601ab-7d09-4254-bd31-7acad2a44dd8',
        title: 'Refrigerante Mini',
        price: 400,
        portion: 'lata 220ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: '5ccb39b3-888a-4cf7-b06c-95efb9240166',
        title: 'Suco Del Vale',
        price: 700,
        portion: 'lata 290ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: 'cb9214be-a5af-41dd-bd50-c38bad382c59',
        title: 'Chá Matte Leão com Limão',
        price: 1000,
        portion: 'copo 400ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: '676d239b-9246-4467-b7ff-8d1319a946aa',
        title: 'Wewi Tônica Rosé',
        price: 1000,
        portion: 'garrafa 255ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: 'c6332067-3629-4b75-988b-cee1a4637117',
        title: 'Wewi Tônica Tangerina',
        price: 1000,
        portion: 'garrafa 255ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: '7ad65e5d-00f6-4211-8aae-2869d9d597b9',
        title: 'Wewi Tea Soda',
        price: 1000,
        portion: 'garrafa 255ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: 'b002856a-e9fd-4a0b-acfa-6a26f249ebad',
        title: 'Suco de Laranja',
        price: 1000,
        portion: 'copo 400ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: 'b4b15256-9c63-44a3-ac0d-99241b775147',
        title: 'Suco de Laranja com Morango',
        price: 1400,
        portion: 'copo 400ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: '0937f023-2a44-4aab-8a54-c9859a5d9bf9',
        title: 'Soda Italiana',
        description: '(Consulte a disponibilidade de sabores)',
        price: 1400,
        portion: 'copo 365ml',
        sectionId: 'cb7d968a-3885-445b-897a-71bf5fc8d6d4',
        isActive: true,
      },
      {
        id: '2eb2d8e3-b680-4e7d-b7e5-8441ffeed7a4',
        title: 'Ice Cappuccino',
        description:
          'Nosso famoso capuccino da casa, na versão geladinha! Leite, café canela, cacau e chantilly.',
        price: 2000,
        portion: '300ml',
        sectionId: 'e7109d68-cd71-40f6-989e-6acc06a7be39',
        isActive: true,
      },
      {
        id: 'ff6a941a-7b1f-465f-b678-6e36165f4cd3',
        title: 'Ice Latte Caramelo',
        description:
          'Caramelo salgado artesanal, leite, café, gelo e crema do leite.',
        price: 2000,
        portion: '300ml',
        sectionId: 'e7109d68-cd71-40f6-989e-6acc06a7be39',
        isActive: true,
      },
      {
        id: '7ea2f375-e0a1-4035-81c3-eac2449a4f33',
        title: 'Frapê de Nutella',
        description: 'Leite, café espresso, Nutella e chantilly.',
        price: 2200,
        portion: '300ml',
        sectionId: 'e7109d68-cd71-40f6-989e-6acc06a7be39',
        isActive: true,
      },
      {
        id: '6d89a8b8-9734-410f-9c23-71b87e0c492b',
        title: 'Frapê de Ovomaltine',
        description: 'Leite, café espresso, Ovomaltine e chantilly.',
        price: 2200,
        portion: '300ml',
        sectionId: 'e7109d68-cd71-40f6-989e-6acc06a7be39',
        isActive: true,
      },
      {
        id: '4ec7929f-7a4a-4502-9d6a-78a46c9bd1ac',
        title: 'Frapê de Doce de Leite com Paçoca',
        description: 'Leite, café espresso, doce de leite, paçoca e chantilly.',
        price: 2200,
        portion: '300ml',
        sectionId: 'e7109d68-cd71-40f6-989e-6acc06a7be39',
        isActive: true,
      },
      {
        id: 'a7221f1d-fe94-43aa-b8f0-ba67cd20661f',
        title: 'Frapê de Red Velvet',
        description:
          'Leite, morango, cream cheese, geleia de frutas vermelhas artesanal e chantilly.',
        price: 2600,
        portion: '300ml',
        sectionId: 'e7109d68-cd71-40f6-989e-6acc06a7be39',
        isActive: true,
      },
      {
        id: 'd7d496b0-f105-4be7-a3f0-a95da0f97aad',
        title: 'Café Curto',
        price: 800,
        portion: '30ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          'fede4576-bca8-4522-b300-3ad305c22730',
          '497cb5d5-0b50-47d4-b55c-b444d486e962',
        ],
      },
      {
        id: '742a27a6-6a2d-4f88-ac43-ed7c2dba10ac',
        title: 'Café Espresso Simples',
        price: 800,
        portion: '50ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          'ad64474d-0d14-4ebe-8b70-12951f048914',
          'fb5df48c-a218-40e4-8a60-cc1b0fd5323e',
        ],
      },
      {
        id: 'ab70ead6-13b7-490b-a931-7bf6efbc76df',
        title: 'Café Espresso Duplo',
        price: 1200,
        portion: '100ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          'acb1c0c1-2a80-46ee-a543-9cef27f7fbe6',
          '8fc86d54-6021-4e63-b479-e62eb5dfdf4b',
        ],
      },
      {
        id: '27cf589a-faf0-4795-80a8-87721f144918',
        title: 'Café Macchiatto Simples',
        description: 'Café espresso e espuma do leite.',
        price: 1000,
        portion: '50ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          'e8e244b8-35a4-4f8e-a87a-ed7f69d026b9',
          'c1c6e688-844d-49ba-b2bd-34baf0f80de1',
        ],
      },
      {
        id: 'c1ef176d-505d-4c28-9f34-7000900cdcce',
        title: 'Café Macchiatto Duplo',
        description: 'Café espresso e espuma do leite.',
        price: 1400,
        portion: '100ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          '45deacf9-a215-49f6-9f4d-dc171cdd2d6f',
          '75412f05-8be6-4b74-8bb8-c1f5202e7955',
        ],
      },
      {
        id: 'e8eb127b-ad07-4258-a3b2-e8240f285d8d',
        title: 'Mocha',
        description: 'Café espresso, leite cremoso e ganache de chocolate.',
        price: 1600,
        portion: '180ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          '41808849-9369-4d84-a320-42af1df188c4',
          '1a25429b-51f1-4f76-b6ef-bf9ea05796b2',
        ],
      },
      {
        id: '6f2108f8-5197-4c1c-89b3-9f26ae71ea4e',
        title: 'Cappuccino da Casa',
        description: 'Mistura cremosa e artesanal da casa. Já vem adoçado!',
        price: 1400,
        portion: '180ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          '64e63bb6-a4f7-4864-9b01-06da2d905f41',
          '52d5e3fd-4a77-4dda-a077-ff96747f4e42',
        ],
      },
      {
        id: '1c095072-47ad-413e-9530-2ac82bd6a962',
        title: 'Cappuccino Italiano',
        description: 'Receita tradicional de leite, café e espuma do leite.',
        price: 1400,
        portion: '180ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          '3c6870ac-ff8a-4fb1-aa9e-ec2f0e0f9a5a',
          'fbde8133-4331-4549-86a6-ace37b502f3c',
        ],
      },
      {
        id: '2ee3a02a-a0e6-4e8f-b395-27261e333c1a',
        title: 'Cappuccino Caramelo',
        description:
          'Café espresso, leite cremoso e caramelo salgado artesanal.',
        price: 1600,
        portion: '180ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          '56b08a2b-a3ee-4a3c-8ba2-46137b6b56e5',
          'c55c2c16-6986-4aad-a04e-c17ac4948195',
        ],
      },
      {
        id: '5fc838ca-afd7-4f4e-acfa-8298bc4dd9ea',
        title: 'Cappuccino de Nutella',
        description:
          'Café espresso, leite cremoso e Nutella, decorado com borda de Nutella.',
        price: 1600,
        portion: '180ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          '32b5a3bc-8c18-4779-b069-3765c12925b2',
          '85d85f38-2327-4216-a807-55584fa67fda',
        ],
      },
      {
        id: 'e10245da-5699-4355-b783-9455728227a0',
        title: 'Cappuccino de Pistache',
        description:
          'Café espresso, leite cremoso e brigadeiro de pistache, decorado com borda de brigadeiro de pistache.',
        price: 1800,
        portion: '180ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          'db62fb2a-f761-4050-b2c2-b2f1638a77fa',
          '6e96956a-d213-430d-a4f6-fd07c517c6c3',
        ],
      },
      {
        id: '711d1c6c-35c3-4a7e-b418-2e31503a9de9',
        title: 'Cappuccino com Leite Vegetal',
        description: 'Café espresso e leite vegetal Naveia®',
        price: 1800,
        portion: '180ml',
        sectionId: 'b4c05be0-13d5-42b9-b8b1-48f0331459e0',
        isActive: true,
        dishExtrasOrder: [
          '2c7435e1-74cb-45c3-8ec6-cf76f658e98e',
          '640da291-ab7a-45a1-b93b-06324ca6bef6',
        ],
      },
      {
        id: '68c85fb2-7a3a-4842-b671-7fcb264da31a',
        title: 'Docinho Tradicional',
        price: 400,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '92752ed2-d9d8-448a-ab31-13d90a6dee09',
        title: 'Brigadeiro Kinder',
        price: 500,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'b63e5862-8a82-437d-b8e2-da0f14950f2a',
        title: 'Bombom e Trufa',
        price: 500,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'f10153d0-6c43-4795-9ca9-6b80db6177d8',
        title: 'Caramelado',
        description:
          'Ouriço - beijinho de coco caramelado envolto por coco queimado.',
        price: 500,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '1d1e4911-b150-4cde-aeb6-80a2b4cf9286',
        title: 'Bala Baiana',
        description: 'Beijinho de coco caramelado embalado no papel celofane.',
        price: 600,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '002a5fe0-e0fb-41a0-843c-80ea54cfa101',
        title: 'Cenourella',
        description:
          'Bolinho individual com massa fofinha de cenoura recheado e coberto com Nutella.',
        price: 650,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'f2e331e0-8433-446f-afd9-7855aa7e555d',
        title: 'Bombom de Morango',
        description:
          'Brigadeiro branco recheado de morango e banhado no chocolate.',
        price: 750,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'e72386be-5ff9-45bf-b341-2bc18772f065',
        title: 'Surpresa de Uva',
        description:
          'Brigadeiro branco recheado com uva Thompson sem sementes coberto com flakes de chocolate ao leite.',
        price: 750,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '5694f569-91c1-408c-bb75-13eb792002ff',
        title: 'Pão de Mel',
        description:
          'Massa fofinha de pão de mel banhado no chocolate, recheado de doce de leite, beijinho ou brigadeiro.',
        price: 800,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'f86f3324-6e4c-40f8-9b78-a26f30af7845',
        title: 'Palha Italiana',
        description:
          'Brigadeiro cremoso com bolacha de maisena, envolto de leite ninho.',
        price: 800,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'b6a678cf-121a-4536-a154-1f94da3be777',
        title: 'Torta Fatia da Semana',
        description: '(Consulte a disponibilidade de sabores)',
        price: 1000,
        portion: 'cada 100g',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '05b02003-265b-4b84-9791-09754279d203',
        title: 'Bolo Gelado',
        price: 1000,
        portion: 'cada 100g',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'b05f2bb2-970b-482f-be2c-e96c791fedde',
        title: 'Bolo no Pote Maria Valentina',
        description:
          'Pão de ló branco, recheio de creme de leite ninho, brigadeiro cremoso e chantilly',
        price: 1200,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '1e6a2223-d9fe-4867-93cf-ee5b37c5f115',
        title: 'Chiffon no pote',
        description:
          'Pão de ló de chocolate com recheio e cobertura de mousse de chocolate chiffon.',
        price: 1200,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '505ac03c-7390-47d5-8eb9-088e3edf7ea0',
        title: 'Cupcake Red Velvet',
        description:
          'Massa aveludada vermelha com recheio e cobertura de creme doce a base de cream cheese e baunilha.',
        price: 1400,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'c2c6bac1-e5b5-4c66-aad1-a5ece96e6da9',
        title: 'Torta Holandesa no Porte',
        description:
          'Base de bolacha amanteigada com creme especial de chocolate branco, ganache de chocolate meio amargo e bolacha calipso.',
        price: 1400,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '3124de16-8cff-4e74-9164-ceb131fbeda2',
        title: 'Brownie Recheado',
        price: 1500,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '79163115-b14e-4d57-92a1-87e5d8091554',
        title: 'Cheesecake de Frutas Vermelhas',
        description:
          'Base de bolacha amanteigada com creme de cream cheese doce e geleia de frutas vermelhas.',
        price: 1600,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '2dc394d5-94a1-4b34-89e5-ef3802458e28',
        title: 'Casquinha de Limão',
        description:
          'Massa amanteigada tipo sablée, recheio de mousse de limão com cobertura de marshmallow.',
        price: 1600,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'd5308376-8331-4b0c-bd96-820e25f03403',
        title: 'Casquinha de Morango',
        description:
          'Massa amanteigada tipo sablée, recheio de creme pâtisserie, morangos e pistache decorando.',
        price: 1600,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: '0a83c9c8-52b4-4e3b-b5e6-5438e73529b8',
        title: 'Casquinha de Sucrée',
        description:
          'Massa amanteigada de chocolate tipo sucrée, recheio de trufa de chocolate meio amargo e mousse de chocolate.',
        price: 1600,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'e02ae1fd-e185-4bd2-aff2-11212c649427',
        title: 'Casquinha de Uva',
        description:
          'Massa amanteigada tipo sablée, recheio de brigadeiro branco e ganache de chocolate ao leite, decorada com uvas thompson sem semente e amêndoas laminadas.',
        price: 1600,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'ae88911b-e8d0-41ba-82a1-d1610f766ac4',
        title: 'Casquinha de Brigadeiro Belga',
        description:
          'Massa amanteigada tipo sablée, recheio de brigadeiro belga, decorado com brigadeiro e flakes de chocolate ao leite.',
        price: 1600,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'e66c2c56-0b64-44e1-b86e-79d5d207de2e',
        title: 'Fatia Chocolatudo Belga',
        description:
          'Massa 50% cacau com cobertura de brigadeiro trufado. Servido Quentinho!',
        price: 1600,
        portion: 'a fatia',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'b4ce8815-d4d9-4cdb-ac62-67e9e2e16875',
        title: 'Mini Bolo Surpresa Ninho com Nutella',
        description:
          'Massa 50% cacau com recheio de Nutella e cobertura e brigadeiro de leite ninho. Servido Quentinho!',
        price: 1800,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'a57b3466-a356-4bee-b269-0da4a617f2b5',
        title: 'Banoffee',
        description:
          'Base de bolacha amanteigada, ganache de doce de leite, banana prata in natura, creme de leite ninho e farofinha crocante de canela.',
        price: 1800,
        portion: '01 unidade',
        sectionId: '28adc859-8197-4a6c-8322-028d376dfe9b',
        isActive: true,
      },
      {
        id: 'a0782704-b36e-4bd4-9895-bff57172fe7b',
        title: 'Red Velvet',
        description:
          'Camadas de massa aveludada vermelha com recheio de creme doce a base de cream cheese e baunilha.',
        price: 1800,
        portion: '01 unidade',
        sectionId: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        isActive: true,
      },
      {
        id: '76f6319b-eaaa-40e2-a76a-2985c1c5744e',
        title: 'Morango',
        description: 'Brigadeiro de leite ninho, morangos fatiados e Nutella.',
        price: 1800,
        portion: '01 unidade',
        sectionId: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        isActive: true,
      },
      {
        id: '6087b1bf-d87a-4824-b58f-2450e6a6c217',
        title: 'Brownie Ninho com Nutella',
        description:
          'Camadas de brownie, recheio de brigadeiro de leite ninho e Nutella.',
        price: 1800,
        portion: '01 unidade',
        sectionId: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        isActive: true,
      },
      {
        id: 'f06e401b-5533-4116-914d-867d5a26c16c',
        title: 'Kinder Duo',
        description:
          'Camadas de pão de ló de chocolate, recheio de mousse de chocolate e brigadeiro branco.',
        price: 1800,
        portion: '01 unidade',
        sectionId: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        isActive: true,
      },
      {
        id: 'b8f58d39-5a40-47e1-a270-5b384ff2d2b7',
        title: 'Quatro Leites com Abacaxi e Ninho',
        description:
          'Camadas de pão de ló branco, recheio de quatro leites, creme de leite ninho e compota artesanal de abacaxi.',
        price: 1800,
        portion: '01 unidade',
        sectionId: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        isActive: true,
      },
      {
        id: 'bd60ccfd-5aad-4892-9620-2c740e330f05',
        title: 'Frutas Vermelhas com Cream Cheese',
        description:
          'Camadas de pão de ló branco, recheio de geleia de frutas vermelhas e creme doce a base de cream cheese e baunilha.',
        price: 1800,
        portion: '01 unidade',
        sectionId: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        isActive: true,
      },
      {
        id: '7e56ccbc-96ed-49e4-99b3-ee6d139cc130',
        title: 'Surpresa Ninho com Nutella',
        description:
          'Camadas de bolo 50% cacau, recheio de brigadeiro de leite ninho e Nutella.',
        price: 1800,
        portion: '01 unidade',
        sectionId: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        isActive: true,
      },
      {
        id: '33ccd1a3-a830-40ff-8976-f7f959c03758',
        title: 'Ninho Trufado',
        description:
          'Camadas de pão de ló branco, mousse de leite ninho e ganache de chocolate.',
        price: 1800,
        portion: '01 unidade',
        sectionId: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        isActive: true,
      },
      {
        id: '45beb02c-3660-4ea5-9a83-c6d6ef71374f',
        title: 'Pistache',
        description:
          'Camadas de pão de ló branco, brigadeiro branco, crumble de pistache e brigadeiro cremoso de pistache.',
        price: 2200,
        portion: '01 unidade',
        sectionId: 'c3be3ba8-7a32-406e-8c67-8581a8df2b23',
        isActive: true,
      },
    ],
  });

  await prisma.dishMedias.createMany({
    data: [
      {
        id: 'b2248f89-3af7-48bc-a8fc-30fe3bb1c6a5',
        title: 'pao-de-queijo',
        dishId: '14562f5d-1d13-463b-9565-9335fba8bee7',
        url: 'dish-medias/b2248f89-3af7-48bc-a8fc-30fe3bb1c6a5.jpg',
      },
      {
        id: '8cd73aa9-e85d-418d-9463-606bb6dff217',
        title: 'agua-mineral',
        dishId: '55302d68-2678-45c7-a1d7-18ec19d21108',
        url: 'dish-medias/8cd73aa9-e85d-418d-9463-606bb6dff217.jpg',
      },
      {
        id: '2d67372e-fd2b-4d07-a0ae-62d60117c9b6',
        title: 'cha-matte-leao-com-limao',
        dishId: 'cb9214be-a5af-41dd-bd50-c38bad382c59',
        url: 'dish-medias/2d67372e-fd2b-4d07-a0ae-62d60117c9b6.jpg',
      },
      {
        id: '8fa9055e-4e83-433e-af93-ae6200c2f5a5',
        title: 'suco-de-laranja',
        dishId: 'b002856a-e9fd-4a0b-acfa-6a26f249ebad',
        url: 'dish-medias/8fa9055e-4e83-433e-af93-ae6200c2f5a5.jpg',
      },
      {
        id: '50bbe07f-d493-4c35-baff-a37b24585b3a',
        title: 'frape-de-nutella',
        dishId: '7ea2f375-e0a1-4035-81c3-eac2449a4f33',
        url: 'dish-medias/50bbe07f-d493-4c35-baff-a37b24585b3a.jpg',
      },
      {
        id: '4821a388-3931-4614-bbe6-35d2d7edbb91',
        title: 'frape-de-nutella',
        dishId: '7ea2f375-e0a1-4035-81c3-eac2449a4f33',
        url: 'dish-medias/4821a388-3931-4614-bbe6-35d2d7edbb91.jpg',
      },
      {
        id: 'd4e7176c-b492-47b4-a442-ddd1c4052aa3',
        title: 'frape-de-red-velvet',
        dishId: 'a7221f1d-fe94-43aa-b8f0-ba67cd20661f',
        url: 'dish-medias/d4e7176c-b492-47b4-a442-ddd1c4052aa3.jpg',
      },
      {
        id: '6aac5f1f-e076-4f6e-bb14-5ae3c5969296',
        title: 'frape-de-ovomaltine',
        dishId: '6d89a8b8-9734-410f-9c23-71b87e0c492b',
        url: 'dish-medias/6aac5f1f-e076-4f6e-bb14-5ae3c5969296.jpg',
      },
      {
        id: 'a736adae-117e-45b0-b7ea-5a93b1fb6383',
        title: 'ice-cappuccino',
        dishId: '2eb2d8e3-b680-4e7d-b7e5-8441ffeed7a4',
        url: 'dish-medias/a736adae-117e-45b0-b7ea-5a93b1fb6383.jpg',
      },
      {
        id: '034e7b64-8453-4fe1-9d2b-1c30368a5797',
        title: 'ice-latte-caramelo',
        dishId: 'ff6a941a-7b1f-465f-b678-6e36165f4cd3',
        url: 'dish-medias/034e7b64-8453-4fe1-9d2b-1c30368a5797.jpg',
      },
      {
        id: '9a847cc6-6a1f-4cc6-b674-093da06f1aff',
        title: 'ice-latte-caramelo',
        dishId: 'ff6a941a-7b1f-465f-b678-6e36165f4cd3',
        url: 'dish-medias/9a847cc6-6a1f-4cc6-b674-093da06f1aff.jpg',
      },
      {
        id: '1301cb2f-e65d-4fcb-a1aa-5620e352e765',
        title: 'cappuccino-de-pistache',
        dishId: 'e10245da-5699-4355-b783-9455728227a0',
        url: 'dish-medias/1301cb2f-e65d-4fcb-a1aa-5620e352e765.jpg',
      },
      {
        id: '122136ff-196d-4425-a20c-107b79c3e78f',
        title: 'cappuccino-caramelo',
        dishId: '2ee3a02a-a0e6-4e8f-b395-27261e333c1a',
        url: 'dish-medias/122136ff-196d-4425-a20c-107b79c3e78f.jpg',
      },
      {
        id: 'eadd61d1-cfdf-4859-90d0-9247cca4b51b',
        title: 'cappuccino-de-nutella',
        dishId: '5fc838ca-afd7-4f4e-acfa-8298bc4dd9ea',
        url: 'dish-medias/eadd61d1-cfdf-4859-90d0-9247cca4b51b.jpg',
      },
      {
        id: 'aef6d653-4ab3-48f8-b5c6-782b91fc8c47',
        title: 'cappuccino-da-casa',
        dishId: '6f2108f8-5197-4c1c-89b3-9f26ae71ea4e',
        url: 'dish-medias/aef6d653-4ab3-48f8-b5c6-782b91fc8c47.jpg',
      },
      {
        id: '151996bd-1fc0-4b77-8281-394436ac80a9',
        title: 'mocha',
        dishId: 'e8eb127b-ad07-4258-a3b2-e8240f285d8d',
        url: 'dish-medias/151996bd-1fc0-4b77-8281-394436ac80a9.jpg',
      },
      {
        id: 'a0dccd95-2aa3-4999-8fd3-c6e6d7de65cc',
        title: 'bolo-no-pote-maria-valentina',
        dishId: 'b05f2bb2-970b-482f-be2c-e96c791fedde',
        url: 'dish-medias/a0dccd95-2aa3-4999-8fd3-c6e6d7de65cc.jpg',
      },
      {
        id: '7b24e9dd-ad59-41e3-b657-06c0200a8a93',
        title: 'bolo-no-pote-maria-valentina',
        dishId: 'b05f2bb2-970b-482f-be2c-e96c791fedde',
        url: 'dish-medias/7b24e9dd-ad59-41e3-b657-06c0200a8a93.jpg',
      },
      {
        id: 'f6c5946a-a4ee-4ace-929a-b310657dab27',
        title: 'chiffon-no-pote',
        dishId: '1e6a2223-d9fe-4867-93cf-ee5b37c5f115',
        url: 'dish-medias/f6c5946a-a4ee-4ace-929a-b310657dab27.jpg',
      },
      {
        id: '6c30f874-04f4-46ad-9f4d-1126db637e84',
        title: 'chiffon-no-pote',
        dishId: '1e6a2223-d9fe-4867-93cf-ee5b37c5f115',
        url: 'dish-medias/6c30f874-04f4-46ad-9f4d-1126db637e84.jpg',
      },
      {
        id: '862fb5a1-8971-4899-8fe1-d54f014d626e',
        title: 'brownie-ninho-com-nutella',
        dishId: '6087b1bf-d87a-4824-b58f-2450e6a6c217',
        url: 'dish-medias/862fb5a1-8971-4899-8fe1-d54f014d626e.jpg',
      },
      {
        id: '1b9a1289-dbc8-4043-9d73-b9bfc48b4e34',
        title: 'brownie-ninho-com-nutella',
        dishId: '6087b1bf-d87a-4824-b58f-2450e6a6c217',
        url: 'dish-medias/1b9a1289-dbc8-4043-9d73-b9bfc48b4e34.jpg',
      },
      {
        id: '4ee489c4-451b-4ad1-a0f1-37eecd4348c4',
        title: 'surpresa-ninho-com-nutella',
        dishId: '7e56ccbc-96ed-49e4-99b3-ee6d139cc130',
        url: 'dish-medias/4ee489c4-451b-4ad1-a0f1-37eecd4348c4.jpg',
      },
      {
        id: '787884da-2821-4509-ad9b-46a511babdab',
        title: 'surpresa-ninho-com-nutella',
        dishId: '7e56ccbc-96ed-49e4-99b3-ee6d139cc130',
        url: 'dish-medias/787884da-2821-4509-ad9b-46a511babdab.jpg',
      },
      {
        id: '172ab231-2239-4385-8ac1-7a8f265f4d4c',
        title: 'red-velvet',
        dishId: 'a0782704-b36e-4bd4-9895-bff57172fe7b',
        url: 'dish-medias/172ab231-2239-4385-8ac1-7a8f265f4d4c.jpg',
      },
      {
        id: '9006ac3d-2676-4214-a123-da9f205f2e7d',
        title: 'red-velvet',
        dishId: 'a0782704-b36e-4bd4-9895-bff57172fe7b',
        url: 'dish-medias/9006ac3d-2676-4214-a123-da9f205f2e7d.jpg',
      },
      {
        id: '267ec4c9-3f18-46ac-a262-81e85fbea2a0',
        title: 'kinder-duo',
        dishId: 'f06e401b-5533-4116-914d-867d5a26c16c',
        url: 'dish-medias/267ec4c9-3f18-46ac-a262-81e85fbea2a0.jpg',
      },
      {
        id: '43c2e030-6541-4813-a8f7-ef85b35d9003',
        title: 'kinder-duo',
        dishId: 'f06e401b-5533-4116-914d-867d5a26c16c',
        url: 'dish-medias/43c2e030-6541-4813-a8f7-ef85b35d9003.jpg',
      },
      {
        id: '59353ac8-6ae7-4911-82b4-7bf7e705aa65',
        title: 'kinder-duo',
        dishId: 'f06e401b-5533-4116-914d-867d5a26c16c',
        url: 'dish-medias/59353ac8-6ae7-4911-82b4-7bf7e705aa65.jpg',
      },
      {
        id: '4a57b754-74ce-4f45-b7c7-2b67622c6f16',
        title: 'ninho-trufado',
        dishId: '33ccd1a3-a830-40ff-8976-f7f959c03758',
        url: 'dish-medias/4a57b754-74ce-4f45-b7c7-2b67622c6f16.jpg',
      },
      {
        id: '09c71b9d-e460-4791-a654-34a8a5deaa19',
        title: 'ninho-trufado',
        dishId: '33ccd1a3-a830-40ff-8976-f7f959c03758',
        url: 'dish-medias/09c71b9d-e460-4791-a654-34a8a5deaa19.jpg',
      },
      {
        id: '5f3be3c0-bb52-48fb-a162-f2fc999688a9',
        title: 'quatro-leites-com-abacaxi-e-ninho',
        dishId: 'b8f58d39-5a40-47e1-a270-5b384ff2d2b7',
        url: 'dish-medias/5f3be3c0-bb52-48fb-a162-f2fc999688a9.jpg',
      },
      {
        id: 'c591f2d7-3094-4cac-a045-8bea098282c0',
        title: 'quatro-leites-com-abacaxi-e-ninho',
        dishId: 'b8f58d39-5a40-47e1-a270-5b384ff2d2b7',
        url: 'dish-medias/c591f2d7-3094-4cac-a045-8bea098282c0.jpg',
      },
      {
        id: '1b4caf85-ec47-4c26-bfa4-f18bdeceff5d',
        title: 'pistache',
        dishId: '45beb02c-3660-4ea5-9a83-c6d6ef71374f',
        url: 'dish-medias/1b4caf85-ec47-4c26-bfa4-f18bdeceff5d.jpg',
      },
      {
        id: '41f2990c-f07c-4ed0-96d6-fe8e751afa28',
        title: 'pistache',
        dishId: '45beb02c-3660-4ea5-9a83-c6d6ef71374f',
        url: 'dish-medias/41f2990c-f07c-4ed0-96d6-fe8e751afa28.jpg',
      },
      {
        id: '10138439-2216-4707-a468-697263256b12',
        title: 'morango',
        dishId: '76f6319b-eaaa-40e2-a76a-2985c1c5744e',
        url: 'dish-medias/10138439-2216-4707-a468-697263256b12.jpg',
      },
      {
        id: 'dd77b90d-931b-45d1-be5e-8a52402cf3a5',
        title: 'morango',
        dishId: '76f6319b-eaaa-40e2-a76a-2985c1c5744e',
        url: 'dish-medias/dd77b90d-931b-45d1-be5e-8a52402cf3a5.jpg',
      },
      {
        id: '53500eec-c19d-4b19-96b1-4c383befa333',
        title: 'frutas-vermelhas-com-cream-cheese',
        dishId: 'bd60ccfd-5aad-4892-9620-2c740e330f05',
        url: 'dish-medias/53500eec-c19d-4b19-96b1-4c383befa333.jpg',
      },
      {
        id: '8f6461e8-3b1e-4049-9227-b7794074aedc',
        title: 'frutas-vermelhas-com-cream-cheese',
        dishId: 'bd60ccfd-5aad-4892-9620-2c740e330f05',
        url: 'dish-medias/8f6461e8-3b1e-4049-9227-b7794074aedc.jpg',
      },
      {
        id: 'ada5b517-2013-421a-b7b0-1d02db8126b6',
        title: 'torta-holandesa-no-porte',
        dishId: 'c2c6bac1-e5b5-4c66-aad1-a5ece96e6da9',
        url: 'dish-medias/ada5b517-2013-421a-b7b0-1d02db8126b6.jpg',
      },
      {
        id: 'cabffd47-0a64-4190-aa24-575a1a44346a',
        title: 'torta-holandesa-no-porte',
        dishId: 'c2c6bac1-e5b5-4c66-aad1-a5ece96e6da9',
        url: 'dish-medias/cabffd47-0a64-4190-aa24-575a1a44346a.jpg',
      },
      {
        id: '58c6c979-083e-4a81-b97e-ba941f220d32',
        title: 'banoffee',
        dishId: 'a57b3466-a356-4bee-b269-0da4a617f2b5',
        url: 'dish-medias/58c6c979-083e-4a81-b97e-ba941f220d32.jpg',
      },
      {
        id: 'a272cdd6-72b5-4069-ae19-ec8e125c8441',
        title: 'bolo-gelado',
        dishId: '05b02003-265b-4b84-9791-09754279d203',
        url: 'dish-medias/a272cdd6-72b5-4069-ae19-ec8e125c8441.jpg',
      },
      {
        id: '05c61d3d-e6ee-494f-8ef2-e0db35247ca6',
        title: 'cupcake-red-velvet',
        dishId: '505ac03c-7390-47d5-8eb9-088e3edf7ea0',
        url: 'dish-medias/05c61d3d-e6ee-494f-8ef2-e0db35247ca6.jpg',
      },
      {
        id: '3bd171c8-b7db-4449-b683-bb902e7f3022',
        title: 'quiche-de-queijo-brie-com-damasco',
        dishId: 'e4d190ef-3496-4a0a-92b7-92ab654bf59f',
        url: 'dish-medias/3bd171c8-b7db-4449-b683-bb902e7f3022.jpg',
      },
      {
        id: 'dc20b66d-56c5-450a-9bc9-bd4351b809f0',
        title: 'quiche-de-queijo-brie-com-damasco',
        dishId: 'e4d190ef-3496-4a0a-92b7-92ab654bf59f',
        url: 'dish-medias/dc20b66d-56c5-450a-9bc9-bd4351b809f0.jpg',
      },
      {
        id: 'dc1cf279-2639-4627-ac0e-e3d8c4ed0f01',
        title: 'empada-especial-de-camarao',
        dishId: 'f087b95e-7807-485b-943d-a7512fd757e5',
        url: 'dish-medias/dc1cf279-2639-4627-ac0e-e3d8c4ed0f01.jpg',
      },
      {
        id: 'd1ba76c5-ea9b-44d0-97cc-a218049e60b6',
        title: 'empada-especial-de-camarao',
        dishId: 'f087b95e-7807-485b-943d-a7512fd757e5',
        url: 'dish-medias/d1ba76c5-ea9b-44d0-97cc-a218049e60b6.jpg',
      },
      {
        id: '4013893c-84ce-4202-8fcb-40cef78360ab',
        title: 'empada',
        dishId: '861c3103-2945-4c2c-a52b-eb7d52d40ba9',
        url: 'dish-medias/4013893c-84ce-4202-8fcb-40cef78360ab.jpg',
      },
      {
        id: '63b4b3d5-a4a8-45fb-94c5-4a0957d1bc27',
        title: 'tortinha-pantaneira',
        dishId: '8f500d73-ae4b-4842-9709-ffbe75fedfce',
        url: 'dish-medias/63b4b3d5-a4a8-45fb-94c5-4a0957d1bc27.jpg',
      },
      {
        id: '888094eb-b2db-458c-b859-c5ca050fe2f2',
        title: 'tortinha-pantaneira',
        dishId: '8f500d73-ae4b-4842-9709-ffbe75fedfce',
        url: 'dish-medias/888094eb-b2db-458c-b859-c5ca050fe2f2.jpg',
      },
      {
        id: '50292c39-ad55-4c93-970d-6f09e4186045',
        title: 'bauru',
        dishId: '09cab1b3-49e5-455f-9ce4-36568e2aa894',
        url: 'dish-medias/50292c39-ad55-4c93-970d-6f09e4186045.jpg',
      },
      {
        id: '7cdf1924-d028-4e9c-9100-2c9555c71e90',
        title: 'bauru',
        dishId: '09cab1b3-49e5-455f-9ce4-36568e2aa894',
        url: 'dish-medias/7cdf1924-d028-4e9c-9100-2c9555c71e90.jpg',
      },
      {
        id: '51929b71-0107-48ed-8e0a-310d7d976e42',
        title: 'folhado-de-calabresa',
        dishId: '78b2ee0a-6c0e-4ad4-931d-8271d2695041',
        url: 'dish-medias/51929b71-0107-48ed-8e0a-310d7d976e42.jpg',
      },
      {
        id: 'c3166502-7dfc-467b-898d-7de4b130008e',
        title: 'coxinha-de-frango',
        dishId: '94f506f7-5c6f-44d7-8d88-a28494fb158b',
        url: 'dish-medias/c3166502-7dfc-467b-898d-7de4b130008e.jpg',
      },
      {
        id: '04e1e8f6-4715-4910-97cc-e0d81b0abe1c',
        title: 'coxinha-de-frango',
        dishId: '94f506f7-5c6f-44d7-8d88-a28494fb158b',
        url: 'dish-medias/04e1e8f6-4715-4910-97cc-e0d81b0abe1c.jpg',
      },
      {
        id: '562604f4-f50b-401b-9c6d-0b33e8c68bd3',
        title: 'panini-da-casa',
        dishId: '593df557-94d6-45de-be44-575d37f9552b',
        url: 'dish-medias/562604f4-f50b-401b-9c6d-0b33e8c68bd3.jpg',
      },
      {
        id: '117023d0-33e4-41d2-b750-2cb6b2e53616',
        title: 'panini-da-casa',
        dishId: '593df557-94d6-45de-be44-575d37f9552b',
        url: 'dish-medias/117023d0-33e4-41d2-b750-2cb6b2e53616.jpg',
      },
      {
        id: '608d1394-26dd-4f2c-9174-2c9058cd958a',
        title: 'panini-italia',
        dishId: '799be580-038f-46ce-9f8e-286e43348a5c',
        url: 'dish-medias/608d1394-26dd-4f2c-9174-2c9058cd958a.jpg',
      },
      {
        id: 'f5639fb4-2700-4cad-b5ca-3e4410970229',
        title: 'panini-italia',
        dishId: '799be580-038f-46ce-9f8e-286e43348a5c',
        url: 'dish-medias/f5639fb4-2700-4cad-b5ca-3e4410970229.jpg',
      },
      {
        id: 'b7d31edd-1167-462c-a000-1bbe5fe7a891',
        title: 'queijo-quente',
        dishId: 'c2f4a5c8-36f6-4793-bff3-4f485db09b39',
        url: 'dish-medias/b7d31edd-1167-462c-a000-1bbe5fe7a891.jpg',
      },
      {
        id: '6b398f05-35c2-45fe-9994-93b4d4eda80f',
        title: 'croque-monsieur',
        dishId: '728b0aa4-4c86-4b47-af68-446c684727a4',
        url: 'dish-medias/6b398f05-35c2-45fe-9994-93b4d4eda80f.jpg',
      },
      {
        id: '469dd48b-4030-4a58-912f-d0c45ca5103b',
        title: 'croque-monsieur',
        dishId: '728b0aa4-4c86-4b47-af68-446c684727a4',
        url: 'dish-medias/469dd48b-4030-4a58-912f-d0c45ca5103b.jpg',
      },
      {
        id: '1ea34d14-1845-4c57-8d75-9531505b6753',
        title: 'cheesecake-de-frutas-vermelhas',
        dishId: '79163115-b14e-4d57-92a1-87e5d8091554',
        url: 'dish-medias/1ea34d14-1845-4c57-8d75-9531505b6753.jpg',
      },
      {
        id: '0ad55a43-ad67-4029-ad04-f406ce54fa60',
        title: 'casquinha-de-morango',
        dishId: 'd5308376-8331-4b0c-bd96-820e25f03403',
        url: 'dish-medias/0ad55a43-ad67-4029-ad04-f406ce54fa60.jpg',
      },
      {
        id: 'b1740de5-6d86-4f92-b52f-9e8dedc144fd',
        title: 'casquinha-de-sucree',
        dishId: '0a83c9c8-52b4-4e3b-b5e6-5438e73529b8',
        url: 'dish-medias/b1740de5-6d86-4f92-b52f-9e8dedc144fd.jpg',
      },
      {
        id: '1bcd7683-f0c7-4562-a7f9-07346b752345',
        title: 'casquinha-de-uva',
        dishId: 'e02ae1fd-e185-4bd2-aff2-11212c649427',
        url: 'dish-medias/1bcd7683-f0c7-4562-a7f9-07346b752345.jpg',
      },
      {
        id: 'c523facf-cb60-4d3e-9e0d-a54cca9273c8',
        title: 'casquinha-de-brigadeiro-belga',
        dishId: 'ae88911b-e8d0-41ba-82a1-d1610f766ac4',
        url: 'dish-medias/c523facf-cb60-4d3e-9e0d-a54cca9273c8.jpg',
      },
      {
        id: '3c08f64c-747d-4c63-a0f1-9b33afae1741',
        title: 'casquinha-de-brigadeiro-belga',
        dishId: 'ae88911b-e8d0-41ba-82a1-d1610f766ac4',
        url: 'dish-medias/3c08f64c-747d-4c63-a0f1-9b33afae1741.jpg',
      },
      {
        id: '2a87e20c-c041-4b88-bf78-527895f1918d',
        title: 'brownie-recheado',
        dishId: '3124de16-8cff-4e74-9164-ceb131fbeda2',
        url: 'dish-medias/2a87e20c-c041-4b88-bf78-527895f1918d.jpg',
      },
      {
        id: '6c588682-1d7f-4c26-be7e-cc954a52b312',
        title: 'cenourella',
        dishId: '002a5fe0-e0fb-41a0-843c-80ea54cfa101',
        url: 'dish-medias/6c588682-1d7f-4c26-be7e-cc954a52b312.jpg',
      },
      {
        id: '89921402-466a-470e-8012-3d4fa12ceed0',
        title: 'cenourella',
        dishId: '002a5fe0-e0fb-41a0-843c-80ea54cfa101',
        url: 'dish-medias/89921402-466a-470e-8012-3d4fa12ceed0.jpg',
      },
      {
        id: 'fc1a5f0d-ad57-4a03-aa13-de0c64b509cb',
        title: 'docinho-tradicional',
        dishId: '68c85fb2-7a3a-4842-b671-7fcb264da31a',
        url: 'dish-medias/fc1a5f0d-ad57-4a03-aa13-de0c64b509cb.jpg',
      },
      {
        id: 'faaab47f-b5fa-4c1c-a532-487309aecd71',
        title: 'brigadeiro-kinder',
        dishId: '92752ed2-d9d8-448a-ab31-13d90a6dee09',
        url: 'dish-medias/faaab47f-b5fa-4c1c-a532-487309aecd71.jpg',
      },
      {
        id: 'b1572475-27ef-402c-b40f-5893664ecad5',
        title: 'brigadeiro-kinder',
        dishId: '92752ed2-d9d8-448a-ab31-13d90a6dee09',
        url: 'dish-medias/b1572475-27ef-402c-b40f-5893664ecad5.jpg',
      },
      {
        id: 'f3971cfe-11af-44f2-98a1-33bd944087aa',
        title: 'bombom-de-morango',
        dishId: 'f2e331e0-8433-446f-afd9-7855aa7e555d',
        url: 'dish-medias/f3971cfe-11af-44f2-98a1-33bd944087aa.jpg',
      },
      {
        id: 'f430d774-613f-43fb-811b-39d48e2586d2',
        title: 'bombom-de-morango',
        dishId: 'f2e331e0-8433-446f-afd9-7855aa7e555d',
        url: 'dish-medias/f430d774-613f-43fb-811b-39d48e2586d2.jpg',
      },
      {
        id: '35bda99d-d8e0-4c1e-9d8b-f7656cd56e4a',
        title: 'bombom-de-morango',
        dishId: 'f2e331e0-8433-446f-afd9-7855aa7e555d',
        url: 'dish-medias/35bda99d-d8e0-4c1e-9d8b-f7656cd56e4a.jpg',
      },
      {
        id: '4f534c50-95bc-40b6-8409-b9859aeccb05',
        title: 'surpresa-de-uva',
        dishId: 'e72386be-5ff9-45bf-b341-2bc18772f065',
        url: 'dish-medias/4f534c50-95bc-40b6-8409-b9859aeccb05.jpg',
      },
      {
        id: '50f95c85-7404-4f3d-b6b3-734d4d958949',
        title: 'surpresa-de-uva',
        dishId: 'e72386be-5ff9-45bf-b341-2bc18772f065',
        url: 'dish-medias/50f95c85-7404-4f3d-b6b3-734d4d958949.jpg',
      },
      {
        id: 'ab65d538-fcd1-4ea1-b63e-aedcb1b958cd',
        title: 'bala-baiana',
        dishId: '1d1e4911-b150-4cde-aeb6-80a2b4cf9286',
        url: 'dish-medias/ab65d538-fcd1-4ea1-b63e-aedcb1b958cd.jpg',
      },
      {
        id: '0cfdeb07-18d0-42ec-b869-22a2f5f38618',
        title: 'bala-baiana',
        dishId: '1d1e4911-b150-4cde-aeb6-80a2b4cf9286',
        url: 'dish-medias/0cfdeb07-18d0-42ec-b869-22a2f5f38618.jpg',
      },
      {
        id: '757ba63f-8e0b-482c-baa1-c66719b940c7',
        title: 'bombom-e-trufa',
        dishId: 'b63e5862-8a82-437d-b8e2-da0f14950f2a',
        url: 'dish-medias/757ba63f-8e0b-482c-baa1-c66719b940c7.jpg',
      },
      {
        id: 'fa4b9aa3-cdc5-4a42-8345-d1f36e9e82ba',
        title: 'refrigerante',
        dishId: '79a73421-67b6-409c-839a-f3e1231fb26e',
        url: 'dish-medias/fa4b9aa3-cdc5-4a42-8345-d1f36e9e82ba.jpg',
      },
      {
        id: '161ebba2-287a-46f1-8cbd-341da27a73c1',
        title: 'refrigerante-mini',
        dishId: '842601ab-7d09-4254-bd31-7acad2a44dd8',
        url: 'dish-medias/161ebba2-287a-46f1-8cbd-341da27a73c1.jpg',
      },
      {
        id: '73cf70a3-377e-475c-b294-943be564ab98',
        title: 'suco-del-vale',
        dishId: '5ccb39b3-888a-4cf7-b06c-95efb9240166',
        url: 'dish-medias/73cf70a3-377e-475c-b294-943be564ab98.jpg',
      },
      {
        id: '48b15649-9e98-4c4a-968b-f99787ad4a58',
        title: 'wewi-tonica-rose',
        dishId: '676d239b-9246-4467-b7ff-8d1319a946aa',
        url: 'dish-medias/48b15649-9e98-4c4a-968b-f99787ad4a58.jpg',
      },
      {
        id: '6ff0d350-e5e3-4148-b0c1-3cc860573969',
        title: 'wewi-tonica-tangerina',
        dishId: 'c6332067-3629-4b75-988b-cee1a4637117',
        url: 'dish-medias/6ff0d350-e5e3-4148-b0c1-3cc860573969.jpg',
      },
      {
        id: '079548d4-05cb-4d40-84aa-cf61c8613514',
        title: 'wewi-tea-soda',
        dishId: '7ad65e5d-00f6-4211-8aae-2869d9d597b9',
        url: 'dish-medias/079548d4-05cb-4d40-84aa-cf61c8613514.jpg',
      },
      {
        id: '2317d66d-3d0a-4a7f-af45-0b1754a0a462',
        title: 'frape-de-doce-de-leite-com-pacoca',
        dishId: '4ec7929f-7a4a-4502-9d6a-78a46c9bd1ac',
        url: 'dish-medias/2317d66d-3d0a-4a7f-af45-0b1754a0a462.jpg',
      },
    ],
  });

  await prisma.dishFlavors.createMany({
    data: [
      {
        id: '17cbf6d7-e729-4dfb-9c14-f9a4b26f8818',
        title: 'Empada de Frango',
        label: 'Frango',
        dishId: '861c3103-2945-4c2c-a52b-eb7d52d40ba9',
      },
      {
        id: 'eb5f7b6b-6ebf-44e4-9ace-f2e8ffa815fb',
        title: 'Empada de Palmito',
        label: 'Palmito',
        dishId: '861c3103-2945-4c2c-a52b-eb7d52d40ba9',
      },
      {
        id: '849229e1-5c3c-48ae-bf80-b59b1b94a230',
        title: 'Empada de Frango com Palmito',
        label: 'Frango com Palmito',
        dishId: '861c3103-2945-4c2c-a52b-eb7d52d40ba9',
      },
      {
        id: 'fb73e873-1e26-401c-99d8-c002b6b478ba',
        title: 'Água Mineral Sem Gás',
        label: 'Sem Gás',
        dishId: '55302d68-2678-45c7-a1d7-18ec19d21108',
      },
      {
        id: 'bddaa644-b572-403f-ad4a-986b1aaefbf6',
        title: 'Água Mineral Com Gás',
        label: 'Com Gás',
        dishId: '55302d68-2678-45c7-a1d7-18ec19d21108',
      },
      {
        id: '46936738-c739-4cf6-8e43-8b54c8086ef3',
        title: 'Docinho Tradicional de Brigadeiro',
        label: 'Brigadeiro',
        dishId: '68c85fb2-7a3a-4842-b671-7fcb264da31a',
      },
      {
        id: '489c3e33-59d1-43ea-9b99-960f6cf87ede',
        title: 'Docinho Tradicional de Brigadeiro de Churros',
        label: 'Brigadeiro de Churros',
        dishId: '68c85fb2-7a3a-4842-b671-7fcb264da31a',
      },
      {
        id: 'd72b172d-7a2d-4b0f-bf1e-688e822adfb5',
        title: 'Docinho Tradicional de Leite Ninho',
        label: 'Brigadeiro de Leite Ninho',
        dishId: '68c85fb2-7a3a-4842-b671-7fcb264da31a',
      },
      {
        id: '3304d3bd-88d6-41d4-bc7c-3b6178116e90',
        title: 'Docinho Tradicional de Leite Ninho com Nutella',
        label: 'Brigadeiro de Leite Ninho com Nutella',
        dishId: '68c85fb2-7a3a-4842-b671-7fcb264da31a',
      },
      {
        id: '3d528ee0-b898-4309-9b02-6554a0679765',
        title: 'Palha Italiana de Brigadeiro Tradicional',
        label: 'Brigadeiro Tradicional',
        dishId: 'f86f3324-6e4c-40f8-9b78-a26f30af7845',
      },
      {
        id: 'd5587961-0085-428c-8167-7b7573ac60b2',
        title: 'Palha Italiana de Brigadeiro de Leite Ninho + Brigadeiro',
        label: 'Brigadeiro de Leite Ninho + Brigadeiro',
        dishId: 'f86f3324-6e4c-40f8-9b78-a26f30af7845',
      },
      {
        id: 'f4364d80-4b65-4f33-a30b-2b6255d493de',
        title: 'Palha Italiana Oreo',
        label: 'Oreo',
        description:
          'Brigadeiro belga recheado com bolacha oreo envolto com flakes de chocolate ao leite.',
        dishId: 'f86f3324-6e4c-40f8-9b78-a26f30af7845',
      },
      {
        id: '4dd827dc-37b5-4f62-922d-113315bf4079',
        title: 'Bolo Gelado de Chocomousse',
        label: 'Chocomousse',
        dishId: '05b02003-265b-4b84-9791-09754279d203',
      },
      {
        id: '0e42a5f4-77ef-4033-8336-448af024eb23',
        title: 'Bolo Gelado de Ninho Trufado',
        label: 'Ninho Trufado',
        dishId: '05b02003-265b-4b84-9791-09754279d203',
      },
      {
        id: '9f0f8e39-0d8a-42ad-950b-83cf5d7409df',
        title: 'Bolo Gelado de Coco com Leite Condensado',
        label: 'Coco com Leite Condensado',
        dishId: '05b02003-265b-4b84-9791-09754279d203',
      },
      {
        id: 'bcd254ea-cc71-410f-9aee-22d97ef0eb3e',
        title: 'Bolo Gelado de Ninhotella',
        label: 'Ninhotella',
        dishId: '05b02003-265b-4b84-9791-09754279d203',
      },
      {
        id: 'b64e8fba-4199-439d-9d06-c9e1293d56b0',
        title: 'Bolo Gelado de Leite Ninho',
        label: 'Leite ninho',
        dishId: '05b02003-265b-4b84-9791-09754279d203',
      },
      {
        id: 'a7a1facd-7fc7-4cf8-bf0a-1ced878cf806',
        title: 'Bolo Gelado de Chocolate com Cocada Cremosa',
        label: 'Chocolate com Cocada Cremosa',
        dishId: '05b02003-265b-4b84-9791-09754279d203',
      },
      {
        id: 'f811d5c5-9f1f-46c0-9e76-8e788d878800',
        title: 'Brownie de Ninho com Nutella',
        label: 'Ninho com Nutella',
        dishId: '3124de16-8cff-4e74-9164-ceb131fbeda2',
      },
      {
        id: 'b035d177-8e14-4446-be62-7ef191d5a641',
        title: 'Brownie de Brigadeiro Duo',
        label: 'Brigadeiro Duo',
        dishId: '3124de16-8cff-4e74-9164-ceb131fbeda2',
      },
      {
        id: 'ee5f268f-2a3b-44d6-b19e-fc57b27adbeb',
        title: 'Brownie de Brigadeiro ao Leite',
        label: 'Brigadeiro ao Leite',
        dishId: '3124de16-8cff-4e74-9164-ceb131fbeda2',
      },
    ],
  });

  await prisma.dishFlavorsMedias.createMany({
    data: [
      {
        id: '6c22990e-8364-45a8-a707-8c846df57607',
        title: 'bolo-gelado-de-leite-ninho',
        dishFlavorId: 'b64e8fba-4199-439d-9d06-c9e1293d56b0',
        url: 'dish-flavors/6c22990e-8364-45a8-a707-8c846df57607.jpg',
      },
      {
        id: 'ef24c94e-9ebf-4045-a482-1644c5549bc8',
        title: 'bolo-gelado-de-leite-ninho',
        dishFlavorId: 'b64e8fba-4199-439d-9d06-c9e1293d56b0',
        url: 'dish-flavors/ef24c94e-9ebf-4045-a482-1644c5549bc8.jpg',
      },
      {
        id: '5a7ce668-9b7f-492c-815e-b3d7f1c397b4',
        title: 'bolo-gelado-de-chocomousse',
        dishFlavorId: '4dd827dc-37b5-4f62-922d-113315bf4079',
        url: 'dish-flavors/5a7ce668-9b7f-492c-815e-b3d7f1c397b4.jpg',
      },
      {
        id: '7eab1650-2f4a-4995-a1da-f7344a07d6c9',
        title: 'bolo-gelado-de-chocomousse',
        dishFlavorId: '4dd827dc-37b5-4f62-922d-113315bf4079',
        url: 'dish-flavors/7eab1650-2f4a-4995-a1da-f7344a07d6c9.jpg',
      },
      {
        id: '8a0fa16a-a50d-45fe-a3f0-35b243e66121',
        title: 'bolo-gelado-de-chocolate-com-cocada-cremosa',
        dishFlavorId: 'a7a1facd-7fc7-4cf8-bf0a-1ced878cf806',
        url: 'dish-flavors/8a0fa16a-a50d-45fe-a3f0-35b243e66121.jpg',
      },
      {
        id: 'd77be266-b5f1-4342-9658-e06a39752835',
        title: 'bolo-gelado-de-ninho-trufado',
        dishFlavorId: '0e42a5f4-77ef-4033-8336-448af024eb23',
        url: 'dish-flavors/d77be266-b5f1-4342-9658-e06a39752835.jpg',
      },
      {
        id: '284961e7-0598-4f3a-911b-0d97c1f0506f',
        title: 'bolo-gelado-de-ninho-trufado',
        dishFlavorId: '0e42a5f4-77ef-4033-8336-448af024eb23',
        url: 'dish-flavors/284961e7-0598-4f3a-911b-0d97c1f0506f.jpg',
      },
      {
        id: 'ddf05e3a-319f-419f-b58e-1e574357ac74',
        title: 'bolo-gelado-de-chocolate-com-cocada-cremosa',
        dishFlavorId: 'a7a1facd-7fc7-4cf8-bf0a-1ced878cf806',
        url: 'dish-flavors/ddf05e3a-319f-419f-b58e-1e574357ac74.jpg',
      },
      {
        id: 'e844327b-31c3-4f56-8ce6-9f0c5c7cbc19',
        title: 'bolo-gelado-de-coco-com-leite-condensado',
        dishFlavorId: '9f0f8e39-0d8a-42ad-950b-83cf5d7409df',
        url: 'dish-flavors/e844327b-31c3-4f56-8ce6-9f0c5c7cbc19.jpg',
      },
      {
        id: 'cda9e12c-899d-49a3-98fc-1bd5f9958c42',
        title: 'bolo-gelado-de-coco-com-leite-condensado',
        dishFlavorId: '9f0f8e39-0d8a-42ad-950b-83cf5d7409df',
        url: 'dish-flavors/cda9e12c-899d-49a3-98fc-1bd5f9958c42.jpg',
      },
      {
        id: 'a7fd7888-dc46-4390-b549-2a8293c1b1dc',
        title: 'bolo-gelado-de-ninhotella',
        dishFlavorId: 'bcd254ea-cc71-410f-9aee-22d97ef0eb3e',
        url: 'dish-flavors/a7fd7888-dc46-4390-b549-2a8293c1b1dc.jpg',
      },
      {
        id: 'a00d42e0-4112-4a21-bdc9-951539188149',
        title: 'empada-de-frango',
        dishFlavorId: '17cbf6d7-e729-4dfb-9c14-f9a4b26f8818',
        url: 'dish-flavors/a00d42e0-4112-4a21-bdc9-951539188149.jpg',
      },
      {
        id: 'e41b0f74-e3e6-4997-8415-985a4321ae10',
        title: 'empada-de-palmito',
        dishFlavorId: 'eb5f7b6b-6ebf-44e4-9ace-f2e8ffa815fb',
        url: 'dish-flavors/e41b0f74-e3e6-4997-8415-985a4321ae10.jpg',
      },
      {
        id: 'd1691f76-c64f-4462-9fe8-18875f664ac6',
        title: 'brownie-de-brigadeiro-ao-leite',
        dishFlavorId: 'ee5f268f-2a3b-44d6-b19e-fc57b27adbeb',
        url: 'dish-flavors/d1691f76-c64f-4462-9fe8-18875f664ac6.jpg',
      },
      {
        id: '3e561d15-3926-441a-8874-ab029c93e726',
        title: 'brownie-de-brigadeiro-duo',
        dishFlavorId: 'b035d177-8e14-4446-be62-7ef191d5a641',
        url: 'dish-flavors/3e561d15-3926-441a-8874-ab029c93e726.jpg',
      },
      {
        id: '5dec41ae-9905-42eb-bb5f-aeec9fffe466',
        title: 'brownie-de-ninho-com-nutella',
        dishFlavorId: 'f811d5c5-9f1f-46c0-9e76-8e788d878800',
        url: 'dish-flavors/5dec41ae-9905-42eb-bb5f-aeec9fffe466.jpg',
      },
      {
        id: 'e78d355f-940b-41cf-9725-1bd92b049df4',
        title: 'agua-mineral-sem-gas',
        dishFlavorId: 'fb73e873-1e26-401c-99d8-c002b6b478ba',
        url: 'dish-flavors/e78d355f-940b-41cf-9725-1bd92b049df4.jpg',
      },
      {
        id: '546167af-a384-4c49-bb76-4f9dcf05f769',
        title: 'agua-mineral-com-gas',
        dishFlavorId: 'bddaa644-b572-403f-ad4a-986b1aaefbf6',
        url: 'dish-flavors/546167af-a384-4c49-bb76-4f9dcf05f769.jpg',
      },
    ],
  });

  await prisma.dishExtras.createMany({
    data: [
      {
        id: 'fede4576-bca8-4522-b300-3ad305c22730',
        title: 'Chantilly',
        price: 300,
        dishId: 'd7d496b0-f105-4be7-a3f0-a95da0f97aad',
      },
      {
        id: 'ad64474d-0d14-4ebe-8b70-12951f048914',
        title: 'Chantilly',
        price: 300,
        dishId: '742a27a6-6a2d-4f88-ac43-ed7c2dba10ac',
      },
      {
        id: 'acb1c0c1-2a80-46ee-a543-9cef27f7fbe6',
        title: 'Chantilly',
        price: 300,
        dishId: 'ab70ead6-13b7-490b-a931-7bf6efbc76df',
      },
      {
        id: 'e8e244b8-35a4-4f8e-a87a-ed7f69d026b9',
        title: 'Chantilly',
        price: 300,
        dishId: '27cf589a-faf0-4795-80a8-87721f144918',
      },
      {
        id: '45deacf9-a215-49f6-9f4d-dc171cdd2d6f',
        title: 'Chantilly',
        price: 300,
        dishId: 'c1ef176d-505d-4c28-9f34-7000900cdcce',
      },
      {
        id: '41808849-9369-4d84-a320-42af1df188c4',
        title: 'Chantilly',
        price: 300,
        dishId: 'e8eb127b-ad07-4258-a3b2-e8240f285d8d',
      },
      {
        id: '64e63bb6-a4f7-4864-9b01-06da2d905f41',
        title: 'Chantilly',
        price: 300,
        dishId: '6f2108f8-5197-4c1c-89b3-9f26ae71ea4e',
      },
      {
        id: '3c6870ac-ff8a-4fb1-aa9e-ec2f0e0f9a5a',
        title: 'Chantilly',
        price: 300,
        dishId: '1c095072-47ad-413e-9530-2ac82bd6a962',
      },
      {
        id: '56b08a2b-a3ee-4a3c-8ba2-46137b6b56e5',
        title: 'Chantilly',
        price: 300,
        dishId: '2ee3a02a-a0e6-4e8f-b395-27261e333c1a',
      },
      {
        id: '32b5a3bc-8c18-4779-b069-3765c12925b2',
        title: 'Chantilly',
        price: 300,
        dishId: '5fc838ca-afd7-4f4e-acfa-8298bc4dd9ea',
      },
      {
        id: 'db62fb2a-f761-4050-b2c2-b2f1638a77fa',
        title: 'Chantilly',
        price: 300,
        dishId: 'e10245da-5699-4355-b783-9455728227a0',
      },
      {
        id: '2c7435e1-74cb-45c3-8ec6-cf76f658e98e',
        title: 'Chantilly',
        price: 300,
        dishId: '711d1c6c-35c3-4a7e-b418-2e31503a9de9',
      },
      {
        id: '497cb5d5-0b50-47d4-b55c-b444d486e962',
        title: 'Borda de Nutella',
        price: 400,
        dishId: 'd7d496b0-f105-4be7-a3f0-a95da0f97aad',
      },
      {
        id: 'fb5df48c-a218-40e4-8a60-cc1b0fd5323e',
        title: 'Borda de Nutella',
        price: 400,
        dishId: '742a27a6-6a2d-4f88-ac43-ed7c2dba10ac',
      },
      {
        id: '8fc86d54-6021-4e63-b479-e62eb5dfdf4b',
        title: 'Borda de Nutella',
        price: 400,
        dishId: 'ab70ead6-13b7-490b-a931-7bf6efbc76df',
      },
      {
        id: 'c1c6e688-844d-49ba-b2bd-34baf0f80de1',
        title: 'Borda de Nutella',
        price: 400,
        dishId: '27cf589a-faf0-4795-80a8-87721f144918',
      },
      {
        id: '75412f05-8be6-4b74-8bb8-c1f5202e7955',
        title: 'Borda de Nutella',
        price: 400,
        dishId: 'c1ef176d-505d-4c28-9f34-7000900cdcce',
      },
      {
        id: '1a25429b-51f1-4f76-b6ef-bf9ea05796b2',
        title: 'Borda de Nutella',
        price: 400,
        dishId: 'e8eb127b-ad07-4258-a3b2-e8240f285d8d',
      },
      {
        id: '52d5e3fd-4a77-4dda-a077-ff96747f4e42',
        title: 'Borda de Nutella',
        price: 400,
        dishId: '6f2108f8-5197-4c1c-89b3-9f26ae71ea4e',
      },
      {
        id: 'fbde8133-4331-4549-86a6-ace37b502f3c',
        title: 'Borda de Nutella',
        price: 400,
        dishId: '1c095072-47ad-413e-9530-2ac82bd6a962',
      },
      {
        id: 'c55c2c16-6986-4aad-a04e-c17ac4948195',
        title: 'Borda de Nutella',
        price: 400,
        dishId: '2ee3a02a-a0e6-4e8f-b395-27261e333c1a',
      },
      {
        id: '85d85f38-2327-4216-a807-55584fa67fda',
        title: 'Borda de Nutella',
        price: 400,
        dishId: '5fc838ca-afd7-4f4e-acfa-8298bc4dd9ea',
      },
      {
        id: '6e96956a-d213-430d-a4f6-fd07c517c6c3',
        title: 'Borda de Nutella',
        price: 400,
        dishId: 'e10245da-5699-4355-b783-9455728227a0',
      },
      {
        id: '640da291-ab7a-45a1-b93b-06324ca6bef6',
        title: 'Borda de Nutella',
        price: 400,
        dishId: '711d1c6c-35c3-4a7e-b418-2e31503a9de9',
      },
    ],
  });

  await prisma.dishSpecsDishes.createMany({
    data: [
      {
        dishId: '2eb2d8e3-b680-4e7d-b7e5-8441ffeed7a4',
        dishSpecsId: '61df89fb-cbbd-47fd-9517-2ff0744fc95d',
      },
      {
        dishId: '6f2108f8-5197-4c1c-89b3-9f26ae71ea4e',
        dishSpecsId: '61df89fb-cbbd-47fd-9517-2ff0744fc95d',
      },
      {
        dishId: '45beb02c-3660-4ea5-9a83-c6d6ef71374f',
        dishSpecsId: '61df89fb-cbbd-47fd-9517-2ff0744fc95d',
      },
      {
        dishId: '2eb2d8e3-b680-4e7d-b7e5-8441ffeed7a4',
        dishSpecsId: 'cd04b2e4-7094-4899-ad1f-dabc73c14a63',
      },
      {
        dishId: 'ff6a941a-7b1f-465f-b678-6e36165f4cd3',
        dishSpecsId: 'cd04b2e4-7094-4899-ad1f-dabc73c14a63',
      },
      {
        dishId: '7ea2f375-e0a1-4035-81c3-eac2449a4f33',
        dishSpecsId: 'cd04b2e4-7094-4899-ad1f-dabc73c14a63',
      },
      {
        dishId: '6d89a8b8-9734-410f-9c23-71b87e0c492b',
        dishSpecsId: 'cd04b2e4-7094-4899-ad1f-dabc73c14a63',
      },
      {
        dishId: '4ec7929f-7a4a-4502-9d6a-78a46c9bd1ac',
        dishSpecsId: 'cd04b2e4-7094-4899-ad1f-dabc73c14a63',
      },
      {
        dishId: 'a7221f1d-fe94-43aa-b8f0-ba67cd20661f',
        dishSpecsId: 'cd04b2e4-7094-4899-ad1f-dabc73c14a63',
      },
      {
        dishId: 'd7d496b0-f105-4be7-a3f0-a95da0f97aad',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '742a27a6-6a2d-4f88-ac43-ed7c2dba10ac',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: 'ab70ead6-13b7-490b-a931-7bf6efbc76df',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '27cf589a-faf0-4795-80a8-87721f144918',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: 'c1ef176d-505d-4c28-9f34-7000900cdcce',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: 'e8eb127b-ad07-4258-a3b2-e8240f285d8d',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '6f2108f8-5197-4c1c-89b3-9f26ae71ea4e',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '1c095072-47ad-413e-9530-2ac82bd6a962',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '2ee3a02a-a0e6-4e8f-b395-27261e333c1a',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '5fc838ca-afd7-4f4e-acfa-8298bc4dd9ea',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: 'e10245da-5699-4355-b783-9455728227a0',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '711d1c6c-35c3-4a7e-b418-2e31503a9de9',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '3124de16-8cff-4e74-9164-ceb131fbeda2',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: 'e66c2c56-0b64-44e1-b86e-79d5d207de2e',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: 'b4ce8815-d4d9-4cdb-ac62-67e9e2e16875',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '6087b1bf-d87a-4824-b58f-2450e6a6c217',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '7e56ccbc-96ed-49e4-99b3-ee6d139cc130',
        dishSpecsId: '5715d021-c992-471e-9fc4-eea0006f54bd',
      },
      {
        dishId: '711d1c6c-35c3-4a7e-b418-2e31503a9de9',
        dishSpecsId: 'd99cc296-d309-4188-ba73-19f2b384a37b',
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
