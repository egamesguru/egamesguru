create table public.profiles (
    id uuid not null references auth.users on delete cascade,

    fullname text,
    avatar text,

    primary key(id)
);

-- alter table public.profiles enable row level security;
