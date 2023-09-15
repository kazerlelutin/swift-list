import { sql } from '@vercel/postgres'
export default async function test(req, res) {
  await sql`
  CREATE TABLE IF NOT EXISTS section (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    icon VARCHAR(255),
    parentId INT REFERENCES Section(id)
);`
  await sql`CREATE TABLE IF NOT EXISTS item (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  sectionId INT REFERENCES Section(id)
);`
  await sql`INSERT INTO Section (name, icon) VALUES ('Fruits et légumes', 'icon1') ON CONFLICT (name) DO NOTHING;`
  await sql`INSERT INTO Section (name, icon) VALUES ('Produits laitiers', 'icon2') ON CONFLICT (name) DO NOTHING;`
  const { rows } = await sql`SELECT * FROM section;`

  console.log('________________')

  return res.status(200).json({ message: 'Hello World', rows })
}
