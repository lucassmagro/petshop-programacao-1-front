--
-- PostgreSQL database dump
--

\restrict jgX6cocdkvgXwkMxjnLZh6wiDI0aJkNqBOjHzgyDgJGidnc50DykhSNWFo3UYK5

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-04 22:52:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 222 (class 1259 OID 24589)
-- Name: atendimento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.atendimento (
    id bigint NOT NULL,
    "nomePet" character varying(255) NOT NULL,
    "nomeDono" character varying(255) NOT NULL,
    idservico bigint NOT NULL,
    "valorTotal" double precision NOT NULL,
    "tempoEstimado" double precision NOT NULL
);


ALTER TABLE public.atendimento OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24588)
-- Name: atendimento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.atendimento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.atendimento_id_seq OWNER TO postgres;

--
-- TOC entry 5023 (class 0 OID 0)
-- Dependencies: 221
-- Name: atendimento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.atendimento_id_seq OWNED BY public.atendimento.id;


--
-- TOC entry 220 (class 1259 OID 24578)
-- Name: servico; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servico (
    id bigint NOT NULL,
    descricao character varying(255) NOT NULL,
    preco double precision NOT NULL,
    "duracaoHoras" double precision NOT NULL
);


ALTER TABLE public.servico OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24577)
-- Name: servico_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servico_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.servico_id_seq OWNER TO postgres;

--
-- TOC entry 5024 (class 0 OID 0)
-- Dependencies: 219
-- Name: servico_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servico_id_seq OWNED BY public.servico.id;


--
-- TOC entry 4862 (class 2604 OID 24592)
-- Name: atendimento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atendimento ALTER COLUMN id SET DEFAULT nextval('public.atendimento_id_seq'::regclass);


--
-- TOC entry 4861 (class 2604 OID 24581)
-- Name: servico id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servico ALTER COLUMN id SET DEFAULT nextval('public.servico_id_seq'::regclass);


--
-- TOC entry 5017 (class 0 OID 24589)
-- Dependencies: 222
-- Data for Name: atendimento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.atendimento (id, "nomePet", "nomeDono", idservico, "valorTotal", "tempoEstimado") FROM stdin;
3	Lisa	Lucas	2	100	4
4	Rex	Carlos Silva	3	50	1
5	Mel	Ana Souza	4	120	3
6	Thor	Pedro Oliveira	5	150	1
7	Luna	Maria Santos	6	80	0.5
8	Bela	Joao Ferreira	7	200	2
\.


--
-- TOC entry 5015 (class 0 OID 24578)
-- Dependencies: 220
-- Data for Name: servico; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servico (id, descricao, preco, "duracaoHoras") FROM stdin;
1	tosa	70	2
2	banho	100	4
3	Banho simples	50	1
4	Banho e tosa completo	120	3
5	Consulta veterinaria	150	1
6	Vacinacao anual	80	0.5
7	Adestramento basico	200	2
\.


--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 221
-- Name: atendimento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.atendimento_id_seq', 8, true);


--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 219
-- Name: servico_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servico_id_seq', 7, true);


--
-- TOC entry 4866 (class 2606 OID 24602)
-- Name: atendimento atendimento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atendimento
    ADD CONSTRAINT atendimento_pkey PRIMARY KEY (id);


--
-- TOC entry 4864 (class 2606 OID 24587)
-- Name: servico servico_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servico
    ADD CONSTRAINT servico_pkey PRIMARY KEY (id);


-- Completed on 2026-06-04 22:52:47

--
-- PostgreSQL database dump complete
--

\unrestrict jgX6cocdkvgXwkMxjnLZh6wiDI0aJkNqBOjHzgyDgJGidnc50DykhSNWFo3UYK5

