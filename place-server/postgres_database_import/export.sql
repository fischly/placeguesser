--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

-- Started on 2020-02-10 06:17:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16409)
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    fav_id integer NOT NULL,
    user_id integer,
    loc_id integer,
    rating text
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16407)
-- Name: favorites_fav_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_fav_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_fav_id_seq OWNER TO postgres;

--
-- TOC entry 2838 (class 0 OID 0)
-- Dependencies: 204
-- Name: favorites_fav_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_fav_id_seq OWNED BY public.favorites.fav_id;


--
-- TOC entry 203 (class 1259 OID 16396)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    salt text NOT NULL,
    email text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16394)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 2839 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2696 (class 2604 OID 16412)
-- Name: favorites fav_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN fav_id SET DEFAULT nextval('public.favorites_fav_id_seq'::regclass);


--
-- TOC entry 2695 (class 2604 OID 16399)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 2832 (class 0 OID 16409)
-- Dependencies: 205
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (fav_id, user_id, loc_id, rating) FROM stdin;
1	1	1234	\N
2	1	1234	\N
3	1	1234	\N
4	1	1234	\N
5	1	64778877	\N
6	1	206232079	\N
7	1	68528735	\N
8	1	1830216906	\N
9	7	31480101	\N
\.


--
-- TOC entry 2830 (class 0 OID 16396)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, salt, email) FROM stdin;
2	testuser	97232c5dd13b44c0c7e9fdf1e491ae9dd1346e42757afdc68898652b721cdabff694176d9cd32b0a441a28d2ca4f1b9f6034b4234971cd37c165e9dafd050716	ElA7pjvJPWiLFObQv9sEow==	test@example.com
3	testuser3	d6f7129d9398fe0034a1cbc07bba3164d158d6add8d617cc8e08981ed479799a56ace00b47bcd7fe0dc54df946bef29cf8a2a94da3e6ae737a0ad9231fc1a5f8	lUUjhAVIytJTU2b9bAfBag==	wqe@lelz.to
1	first test user	97232c5dd13b44c0c7e9fdf1e491ae9dd1346e42757afdc68898652b721cdabff694176d9cd32b0a441a28d2ca4f1b9f6034b4234971cd37c165e9dafd050716	ElA7pjvJPWiLFObQv9sEow==	lel@example.com
4	space_user	f3f12a5cde70b5ad5120c44488dc8e709ab9735c88482d1356ffa13818d8515f62dea641cf009dfe0eac425da3c03cf76e2ca489e2fefc964924b3c9867a1bd7	+gLLO9H8OiTMDpkuUEgtwQ==	test@test.test
5	kek	b794751be09e4ffe685190817b0d3cc615878010d10b8393f459025177a3f1f817e9e6e9db912e2c197e54c8ade9aba46a47b544f6b33174115531d6a932a5e7	X+VzdUPQ53f/g9q5Xu3KzQ==	kek@kek.to
6	kek2	b1d737a59eb18d1f8034a5dcef9b275949335c04f5b60ec090f609c01246cfa50a93148d72faeb7071356b535c93681cb7522e37cbe6cae92e6ffc059c3bfa67	fXQDmGzf8Ayv3kySgx3f3g==	kek@lel.to
7	kek3	7c4f96ed55150ecf4a5ec88cd63f3cca00791b810039227c7c685b6c1034768929848d4b00f50a940d2d734e0737bb27ebe1b8d4410a397d323a948fdbf105ea	gJlZCkdX/cTcb95+CIW16Q==	kek3@kek.to
\.


--
-- TOC entry 2840 (class 0 OID 0)
-- Dependencies: 204
-- Name: favorites_fav_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_fav_id_seq', 9, true);


--
-- TOC entry 2841 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 7, true);


--
-- TOC entry 2702 (class 2606 OID 16417)
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (fav_id);


--
-- TOC entry 2698 (class 2606 OID 16404)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2700 (class 2606 OID 16419)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


-- Completed on 2020-02-10 06:17:55

--
-- PostgreSQL database dump complete
--

