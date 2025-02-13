"use client";
import axios from "axios";
import { useState } from "react";
import { Button, Card, Container, Form, Navbar, Nav } from "react-bootstrap";
import styles from "./page.module.css";

export default function Home() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        if (!city) return;
        try {
            setError("");
            console.log(`Fetching weather for city: ${city}`);
            const response = await axios.get(`/api/weather?city=${city}`);
            console.log('Weather data:', response.data);
            setWeather(response.data);
        } catch (err) {
            console.error('Error fetching weather:', err);
            setError("Kota tidak ditemukan!");
            setWeather(null);
        }
    };

    const getWeatherIcon = (icon) => {
        return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    };

    const getWeatherDescription = (description) => {
        const descriptions = {
            "clear sky": "langit cerah",
            "few clouds": "sedikit berawan",
            "scattered clouds": "awan tersebar",
            "broken clouds": "awan terputus",
            "shower rain": "hujan ringan",
            "rain": "hujan",
            "thunderstorm": "badai petir",
            "snow": "salju",
            "mist": "kabut"
        };
        return descriptions[description] || description;
    };

    const getLocalTime = (timezone) => {
        const date = new Date();
        const utcDate = date.getTime() + (date.getTimezoneOffset() * 60000);
        const localDate = new Date(utcDate + (1000 * timezone));
        return localDate.toLocaleTimeString();
    };

    return (
        <div className={styles.wrapper}>
            <Navbar bg="dark" expand="lg" className={styles.header}>
                <Container>
                    <Navbar.Brand href="#" className={styles.navbarBrand}>Website Cuaca</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#" className={styles.navLink}>Home</Nav.Link>
                            <Nav.Link href="#" className={styles.navLink}>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main className={styles.mainContent}>
                <Container className="mt-5">
                    <h1 className="text-center mb-4">Aplikasi Cuaca</h1>
                    <Form className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Masukkan nama kota..."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <Button onClick={fetchWeather} className="ms-2">
                            Cari
                        </Button>
                    </Form>

                    {error && <p className="text-danger mt-3">{error}</p>}

                    {weather && (
                        <Card className="mt-4 p-3 text-center">
                            <Card.Title>{weather.name}, {weather.sys.country}</Card.Title>
                            <Card.Img 
                                variant="top" 
                                src={getWeatherIcon(weather.weather[0].icon)} 
                                alt="Weather icon" 
                                style={{ width: '50px', height: '50px', margin: '0 auto' }} 
                            />
                            <Card.Text>Suhu: {weather.main.temp}°C</Card.Text>
                            <Card.Text>Cuaca: {getWeatherDescription(weather.weather[0].description)}</Card.Text>
                            <Card.Text>Jam Lokal: {getLocalTime(weather.timezone)}</Card.Text>
                        </Card>
                    )}
                </Container>
            </main>
            <footer className={styles.footer}>
                <p>&copy; 2025 by Yosi Arjunita Putri</p>
            </footer>
        </div>
    );
}