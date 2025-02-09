export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, email, message } = req.body;
  
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Sva polja su obavezna!' });
      }
      console.log(`Ime: ${name}, Email: ${email}, Poruka: ${message}`);
  
      return res.status(200).json({ message: 'Poruka uspješno poslana!' });
    }
  
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Metoda ${req.method} nije podržana`);
  }
