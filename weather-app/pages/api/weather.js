export default async function handler(req, res) {
    const { city } = req.query;
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        console.log(`Fetching weather data from URL: ${url}`);
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) {
            console.error('Error from weather API:', data);
            return res.status(data.cod).json({ error: data.message });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: "Server error" });
    }
}