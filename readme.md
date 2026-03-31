# Expense Tracker 2 - Project Folder Structure

```text
Expense Tracker 2/
├── client/
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── pnpm-workspace.yaml
│   ├── postcss.config.mjs
│   ├── proxy.ts
│   ├── README.md
│   ├── tsconfig.json
│   ├── app/
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   └── (root)/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── profile/
│   │       │   └── page.tsx
│   │       └── transactions/
│   │           └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── field.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── spinner.tsx
│   │   │   ├── table.tsx
│   │   │   └── tooltip.tsx
│   │   └── web/
│   │       ├── app-sidebar.tsx
│   │       ├── budget-modal.tsx
│   │       ├── card-section.tsx
│   │       ├── custom-spinner.tsx
│   │       ├── dynamic-breadcrumb.tsx
│   │       ├── Pagination-section.tsx
│   │       ├── theme-provider.tsx
│   │       ├── theme-toggle.tsx
│   │       ├── transaction-chart.tsx
│   │       ├── transaction-delete-button.tsx
│   │       ├── transaction-form.tsx
│   │       ├── transaction-table.tsx
│   │       ├── update-profile.tsx
│   │       └── user-provider.tsx
│   ├── hooks/
│   │   └── use-mobile.ts
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── fetchWithAuth.ts
│   │   └── utils.ts
│   └── public/
├── server/
│   ├── docker-compose.yml
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── prisma.config.ts
│   ├── tsconfig.json
│   ├── db_data/
│   │   └── 18/
│   │       └── docker/
│   │           ├── pg_hba.conf
│   │           ├── pg_ident.conf
│   │           ├── PG_VERSION
│   │           ├── postgresql.auto.conf
│   │           ├── postgresql.conf
│   │           ├── postmaster.opts
│   │           ├── postmaster.pid
│   │           ├── base/
│   │           ├── global/
│   │           ├── pg_commit_ts/
│   │           ├── pg_dynshmem/
│   │           ├── pg_logical/
│   │           ├── pg_multixact/
│   │           ├── pg_notify/
│   │           ├── pg_replslot/
│   │           ├── pg_serial/
│   │           ├── pg_snapshots/
│   │           ├── pg_stat/
│   │           ├── pg_stat_tmp/
│   │           ├── pg_subtrans/
│   │           ├── pg_tblspc/
│   │           └── ...
│   ├── generated/
│   │   └── prisma/
│   │       ├── browser.ts
│   │       ├── client.ts
│   │       ├── commonInputTypes.ts
│   │       ├── enums.ts
│   │       ├── models.ts
│   │       ├── internal/
│   │       └── models/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │       ├── migration_lock.toml
│   │       ├── 20260317150119_schema_build/
│   │       ├── 20260317150807/
│   │       └── 20260325064452_changed_something_in_db/
│   └── src/
│       ├── app.ts
│       ├── index.ts
│       ├── lib/
│       │   ├── prisma.ts
│       │   └── utils/
│       ├── middleware/
│       │   └── requireAuth.ts
│       ├── modules/
│       │   ├── budget/
│       │   ├── transactions/
│       │   └── user/
│       └── Routes/
│           └── index.ts
└── .git/
```

## Notes
- This structure includes the main folders and key files from both client and server.
- Some deeply nested generated/database files are intentionally abbreviated with `...`.
