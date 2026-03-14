create table if not exists users (
  id serial primary key,
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null default 'client',
  created_at timestamptz not null default now()
);

create table if not exists products (
  id serial primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  description text not null,
  price integer not null,
  old_price integer,
  rating numeric(2,1) not null default 4.5,
  created_at timestamptz not null default now()
);

create table if not exists news (
  id serial primary key,
  title text not null,
  summary text not null,
  published_at date not null default current_date
);

create table if not exists leads (
  id serial primary key,
  name text not null,
  email text not null,
  message text not null,
  source text not null,
  created_at timestamptz not null default now()
);

insert into products (slug, name, category, description, price, old_price, rating)
values
  ('linea-x1', 'LINEA X1', 'Оборудование', 'Производительная система для роста скорости отгрузки и снижения операционных затрат.', 129900, 144900, 4.9),
  ('nova-pack-pro', 'NOVA PACK PRO', 'Упаковка', 'Автоматизация упаковки: меньше ручного труда, выше стабильность качества.', 89900, null, 4.8),
  ('scale-control-7', 'SCALE CONTROL 7', 'Контроль качества', 'Точный контроль параметров продукции и снижение доли возвратов.', 56900, null, 4.7)
on conflict (slug) do nothing;

insert into news (title, summary, published_at)
values
  ('Запустили новую B2B-линейку решений', 'Ускорили внедрение и расширили гарантию, чтобы клиенты быстрее получали коммерческий результат.', current_date - interval '4 day'),
  ('Открыли дополнительный логистический хаб', 'Сократили сроки поставки и усилили сервис для корпоративных заказчиков.', current_date - interval '12 day')
on conflict do nothing;