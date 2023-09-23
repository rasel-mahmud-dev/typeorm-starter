create table public.categories
(
    id         serial
        constraint "PK_24dbc6126a28ff948da33e97d3b"
            primary key,
    name       varchar not null,
    slug       varchar not null,
    "parentId" integer
        constraint "FK_9a6f051e66982b5f0318981bcaa"
            references public.categories
);

alter table public.categories
    owner to postgres;




create table public.comments
(
    id         serial
        constraint "PK_8bf68bc960f2b69e818bdb90dcb"
            primary key,
    content    text    not null,
    "authorId" integer not null
        constraint "FK_4548cc4a409b8651ec75f70e280"
            references public.users,
    "tweetId"  integer not null
        constraint "FK_6a390274a89a389c020738fd363"
            references public.tweets
);

alter table public.comments
    owner to postgres;




create table public.likes
(
    id          serial
        constraint "PK_a9323de3f8bced7539a794b4a37"
            primary key,
    "userId"    integer                 not null
        constraint "FK_cfd8e81fac09d7339a32e57d904"
            references public.users,
    "createdAt" timestamp default now() not null,
    "tweetId"   integer                 not null
        constraint "FK_c11000826858057d4e6306a43ad"
            references public.tweets
);

alter table public.likes
    owner to postgres;




create table public.products
(
    id          serial
        constraint "PK_0806c755e0aca124e67c0cf6d7d"
            primary key,
    title       varchar                 not null,
    slug        varchar                 not null,
    price       double precision        not null,
    "authorId"  integer                 not null
        constraint "FK_76ec85a3cf5734a18f3fecda246"
            references public.users,
    "createdAt" timestamp default now() not null
);

alter table public.products
    owner to postgres;



create table public.roles
(
    id   serial
        constraint "PK_c1433d71a4838793a49dcad46ab"
            primary key,
    name varchar not null
);

alter table public.roles
    owner to postgres;




create table public.tweets
(
    id         serial
        constraint "PK_19d841599ad812c558807aec76c"
            primary key,
    title      varchar not null,
    content    varchar not null,
    cover      varchar not null,
    "authorId" integer not null
        constraint "FK_2da2b52386c1c0ad64bf191aa47"
            references public.users
);

alter table public.tweets
    owner to postgres;



create table public.user_role_mapping
(
    id       serial
        constraint "PK_e32fdfd41ab85b0e71775010564"
            primary key,
    "roleId" integer not null
        constraint "FK_fcd20a2b32b9ec0f80bdc409c1c"
            references public.roles,
    "userId" integer not null
        constraint "FK_25076de400dd6f229c3f3f7f5e8"
            references public.users
);

alter table public.user_role_mapping
    owner to postgres;



create table public.users
(
    id          serial
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    email       varchar not null
        constraint "UQ_97672ac88f789774dd47f7c8be3"
            unique,
    "firstName" varchar not null,
    "lastName"  varchar not null
);

alter table public.users
    owner to postgres;

