
--
-- Data for Name: song_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."song_category" ("id", "created_at", "name") VALUES
	('664ee02c-d498-4096-b05d-77d27c51a5fe', '2024-11-24 07:20:20.817349+00', 'song'),
	('1cac11df-132e-4d6c-b759-3e31be7ac3b9', '2024-11-24 07:20:40.804981+00', 'psalm'),
	('8b3978cf-c728-4318-a20e-1310f3f53d50', '2024-11-24 07:20:31.851819+00', 'mass_part'),
	('319b556d-52e1-4f23-9309-ec18fb6ce36b', '2024-11-30 19:35:46.676815+00', 'practice_guide');


--
-- Data for Name: songbooks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."songbooks" ("id", "created_at", "name") VALUES
	('4b41d821-79a3-4167-a74d-c36a8cbc266b', '2024-11-24 07:15:43.313292+00', 'Psalms for Sundays and Solemnities (NRSV Translation) - Year B'),
	('9a90b824-5906-4d5e-8259-c1bf46a22010', '2024-11-24 07:16:18.953483+00', 'Psalms for Sundays and Solemnities (NRSV Translation) - Year A'),
	('efffb4b3-332d-49cf-9eb2-fb56138793dc', '2024-11-24 07:16:30.124228+00', 'Psalms for Sundays and Solemnities (NRSV Translation) - Year C'),
	('f53aa029-00e8-4860-8f28-5163650e13ce', '2024-11-24 07:17:05.930629+00', 'St. Anne''s Mass'),
	('ff7676d6-6d58-4b78-b83c-e47318d2e131', '2024-11-24 07:17:17.863585+00', 'G&P'),
	('9f15221f-06aa-4553-85e4-652bd759a15c', '2024-11-24 07:17:44.334132+00', 'CiS'),
	('a844ef09-9494-4573-b4cc-ceea14657b59', '2024-11-24 07:16:42.793327+00', 'CBW III'),
	('9601a139-f92c-4170-85f4-8daa41d390f3', '2024-12-12 00:33:30.478465+00', 'Misc.');


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."songs" ("id", "song_name", "song_number", "created_at", "song_category_id", "songbook_id") VALUES
	('8434a2b2-d1d3-4135-b704-28a0159a8c2d', 'City of God', '345', '2024-11-30 23:27:21.007368+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('c881273e-83ef-4235-83c7-0bc9e67e9f88', 'There is a Longing', '6.15', '2024-12-12 00:13:30.672527+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', '9f15221f-06aa-4553-85e4-652bd759a15c'),
	('af93c613-890c-4591-be9a-8e792e6cc4a5', 'O Come O Come Emmanuel', '312', '2024-12-12 00:16:19.637187+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('2c8bf19e-261c-4a13-9da2-3b22de7337b0', 'Christmas Concert 2024 guide', '-', '2024-12-12 00:34:01.674966+00', '319b556d-52e1-4f23-9309-ec18fb6ce36b', '9601a139-f92c-4170-85f4-8daa41d390f3'),
	('157c10c2-c964-481c-9009-67eb7a24ea42', 'Holy Holy Holy', '2', '2024-11-13 06:39:17.932968+00', '8b3978cf-c728-4318-a20e-1310f3f53d50', 'f53aa029-00e8-4860-8f28-5163650e13ce'),
	('3e6b0c61-b8db-4855-84b3-39e5c5265216', 'Great Amen', '4', '2024-11-13 06:39:17.932968+00', '8b3978cf-c728-4318-a20e-1310f3f53d50', 'f53aa029-00e8-4860-8f28-5163650e13ce'),
	('43b11101-698b-4109-8489-68431b0be1a3', 'Laudate Omnes Gentes', '570', '2024-11-13 01:37:14.045833+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('471e93f8-5b0b-4e63-a456-179ab126392f', 'Kyrie', '0', '2024-11-13 06:39:17.932968+00', '8b3978cf-c728-4318-a20e-1310f3f53d50', 'f53aa029-00e8-4860-8f28-5163650e13ce'),
	('6de73862-1f98-4018-ab18-0902727d2e4a', 'Alleluia Sing To Jesus', '426', '2024-11-13 01:32:13.081397+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('7bd930d4-fe19-444d-80aa-4e4349267f1a', 'To Jesus Christ Our Sovereign King', '438', '2024-11-13 01:37:14.045833+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('7f60985c-265c-4ab3-b897-f714d025f498', 'Mary''s Song', '436', '2024-11-13 01:37:14.045833+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'ff7676d6-6d58-4b78-b83c-e47318d2e131'),
	('904fadc3-c7db-4a07-b72b-ea27eefa3e58', 'Crown Him With Many Crowns', '437', '2024-11-13 01:37:14.045833+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('b3b5cb24-dc57-406f-823e-ca4d26fcfb7b', 'Child of the Poor', '336', '2024-11-13 06:54:23.699787+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'ff7676d6-6d58-4b78-b83c-e47318d2e131'),
	('bc991678-8bdc-4e18-bf6e-47c5538ab29f', 'Thirty-fourth Sunday in Ordinary Time (Feast of Christ the King)', '105', '2024-11-20 14:40:53.52502+00', '1cac11df-132e-4d6c-b759-3e31be7ac3b9', '4b41d821-79a3-4167-a74d-c36a8cbc266b'),
	('c12a3f54-a01a-492d-a25c-69defffa52f6', 'Lamb Of God', '5', '2024-11-13 06:39:17.932968+00', '8b3978cf-c728-4318-a20e-1310f3f53d50', 'f53aa029-00e8-4860-8f28-5163650e13ce'),
	('cdea17c2-5c84-4ca9-b152-c41439c642db', 'The King of Glory', '423', '2024-11-13 01:37:14.045833+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'ff7676d6-6d58-4b78-b83c-e47318d2e131'),
	('d3351068-cafc-4906-96e8-4467a4f6f333', 'All Glory Praise and Honour', '62', '2024-11-13 01:37:14.045833+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('e5b11a4c-3f4a-4634-b9a5-e015cb2d1642', 'Glory To God', '1', '2024-11-13 06:39:17.932968+00', '8b3978cf-c728-4318-a20e-1310f3f53d50', 'f53aa029-00e8-4860-8f28-5163650e13ce'),
	('f050ef17-2f85-4e32-9697-c84ea58c9679', 'Praise My Soul The King of Heaven', '565', '2024-11-13 01:37:14.045833+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('f0eb523f-2b42-4bef-bff5-89a238aad00c', 'When We Eat This Bread', '3', '2024-11-13 06:39:17.932968+00', '8b3978cf-c728-4318-a20e-1310f3f53d50', 'f53aa029-00e8-4860-8f28-5163650e13ce'),
	('fb9069bb-ed73-45b7-8570-baadfea22cb1', 'Dona Nobis Pacem', '6.2', '2024-11-13 01:37:14.045833+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', '9f15221f-06aa-4553-85e4-652bd759a15c'),
	('9c2309f4-1b57-461a-b6dc-bc5c2a0c37f8', 'The King Shall Come', '307', '2024-11-30 19:36:50.044763+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'ff7676d6-6d58-4b78-b83c-e47318d2e131'),
	('0935eca8-732e-446d-b32b-9f9fa3abcd1e', 'Advent Alleluia', '248', '2024-11-30 19:42:55.356146+00', '8b3978cf-c728-4318-a20e-1310f3f53d50', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('76cbbc78-e56e-4d26-b992-318017dd0e5a', 'Chant Mass', 'p74', '2024-11-30 19:45:32.323116+00', '8b3978cf-c728-4318-a20e-1310f3f53d50', '9f15221f-06aa-4553-85e4-652bd759a15c'),
	('84ebd853-1990-4bd5-b366-12d5ab1fdc3f', 'Prepare the Way', '317', '2024-11-30 22:02:12.571018+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('049bd115-7b76-4309-a803-5bd54f7d92ed', 'Maranatha', '295', '2024-11-30 22:03:17.253929+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('91d33f29-3508-44ef-9113-2cc4c58d1a90', 'The Angel Gabriel from Heaven Came', '316', '2024-12-21 15:35:48.35508+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('502d5604-c587-4cb7-93fd-77cea04ee7f5', 'Immaculate Mary', '463A', '2024-12-24 14:21:55.469584+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'a844ef09-9494-4573-b4cc-ceea14657b59'),
	('0f1132ee-0cce-45b0-9958-89a50f4fb971', 'Silent Night', '312', '2024-12-24 14:23:51.711399+00', '664ee02c-d498-4096-b05d-77d27c51a5fe', 'ff7676d6-6d58-4b78-b83c-e47318d2e131');

--
-- Data for Name: voice_part; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."voice_part" ("id", "created_at", "name") VALUES
	('c94c9b3b-13b0-4b6a-907e-c3af34ce5df6', '2024-11-30 21:20:17.884365+00', 'Alto'),
	('480a5a00-c068-4d4b-b56f-812bb84cc6ec', '2024-11-30 21:20:32.295181+00', 'Melody'),
	('db017ab5-3176-476a-9d24-33fee910eb48', '2024-11-30 21:20:47.960284+00', 'Melody (Soprano)'),
	('fd773c72-8def-4857-baeb-b633c67b6874', '2024-11-30 21:21:00.054175+00', 'Tenor'),
	('7f55be92-fe94-47cb-8c5b-98871fe48cc3', '2024-11-30 21:21:29.626829+00', 'Counter Melody');


--
-- Data for Name: recordings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."recordings" ("id", "song_id", "url", "created_at", "voice_part_id") VALUES
	('02da2f82-b067-40f3-95eb-1699b51e2eac', '6de73862-1f98-4018-ab18-0902727d2e4a', 'https://ctk-choir.beretesting.com/alto/Alto%20Alleluia%20Sing%20To%20Jesus%20CBW%20426.mp3', '2024-11-13 04:22:53.197623+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('0627ff05-53a0-49b8-a505-778579c05750', '471e93f8-5b0b-4e63-a456-179ab126392f', 'https://ctk-choir.beretesting.com/mass-parts/Kyrie.mp3', '2024-11-13 07:02:41.847944+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('0714601d-faeb-4b9f-80ef-ca374138465a', '7f60985c-265c-4ab3-b897-f714d025f498', 'https://ctk-choir.beretesting.com/alto/Alto%20Mary%E2%80%99s%20Song%20G%26P%20436.mp3', '2024-11-13 04:22:53.197623+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('0a670e80-1ebd-4aa0-82d9-dfb33026596f', '43b11101-698b-4109-8489-68431b0be1a3', 'https://ctk-choir.beretesting.com/alto/Alto%20Laudate%20Omnes%20Gentes%20CBW%20570.mp3', '2024-11-13 04:22:53.197623+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('17a6222b-4633-469b-82eb-e3f3a80ada32', 'c12a3f54-a01a-492d-a25c-69defffa52f6', 'https://ctk-choir.beretesting.com/mass-parts/Lamb%20Of%20God.mp3', '2024-11-13 07:02:41.847944+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('1d224a9e-1f35-466d-9e44-1a167b305a76', '7bd930d4-fe19-444d-80aa-4e4349267f1a', 'https://ctk-choir.beretesting.com/alto/Alto%20To%20Jesus%20Christ%20Our%20Sovereign%20King%20CBW%20438.mp3', '2024-11-13 04:22:53.197623+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('257b0c07-c44d-472b-8664-6cf26cd6facf', 'cdea17c2-5c84-4ca9-b152-c41439c642db', 'https://ctk-choir.beretesting.com/melody/Melody%20Or%20Soprano%20For%20The%20King%20Of%20Glory%20G%26P%20423.mp3', '2024-11-13 07:08:48.335281+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('25a5bea1-6d1f-4c61-93ba-4e59ec9624a5', 'b3b5cb24-dc57-406f-823e-ca4d26fcfb7b', 'https://ctk-choir.beretesting.com/melody/Counter%20Melody%20for%20Child%20of%20the%20Poor%20G%26P%20336.mp3', '2024-11-13 07:12:32.500707+00', '7f55be92-fe94-47cb-8c5b-98871fe48cc3'),
	('25b8b446-754c-44b0-bd85-a351b81e8330', '0935eca8-732e-446d-b32b-9f9fa3abcd1e', 'https://ctk-choir.beretesting.com/mass-parts/Advent%20Alleluia%20CBW%20248.mp3', '2024-11-30 19:44:01.059198+00', '480a5a00-c068-4d4b-b56f-812bb84cc6ec'),
	('2ed884a8-a9f0-43e5-b619-059811e00dcc', '7bd930d4-fe19-444d-80aa-4e4349267f1a', 'https://ctk-choir.beretesting.com/melody/Melody%20Soprano%20To%20Jesus%20Christ%20Our%20Sovereign%20King.mp3', '2024-11-13 07:08:48.335281+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('352725a5-daff-46b9-86b1-bfbb56d9c1bc', '43b11101-698b-4109-8489-68431b0be1a3', 'https://ctk-choir.beretesting.com/melody/Melody%20Soprano%20Laudate%20Omens%20Gentes%20CBW%20570.mp3', '2024-11-13 07:08:48.335281+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('4469c271-77f3-4990-a57c-8fbd15429fe4', '9c2309f4-1b57-461a-b6dc-bc5c2a0c37f8', 'https://ctk-choir.beretesting.com/alto/G%26P%20307%20Alto%20The%20King%20Shall%20Come.mp3', '2024-11-30 19:38:41.157942+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('4f0ad63a-49aa-4769-b20b-bd54e2ac1fb1', 'f050ef17-2f85-4e32-9697-c84ea58c9679', 'https://ctk-choir.beretesting.com/alto/Alto%20Verse%202%20Praise%20My%20Soul%2C%20The%20King%20Of%20Heaven%20CBW%20565.mp3', '2024-11-13 04:22:53.197623+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('51d4e9d7-a07d-473d-8546-739629915017', 'bc991678-8bdc-4e18-bf6e-47c5538ab29f', 'https://ctk-choir.beretesting.com/melody/Melody%20Or%20Soprano%20Psalm%20Nov.%2024.mp3', '2024-11-20 14:43:03.294143+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('5e76f0d3-81d0-4655-96ad-8e342d12a08a', 'cdea17c2-5c84-4ca9-b152-c41439c642db', 'https://ctk-choir.beretesting.com/alto/Alto%20The%20King%20Of%20Glory%20Glory%20And%20Praise%20423.mp3', '2024-11-13 04:22:53.197623+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('669d5e0f-0a5f-4b1d-b077-9765993df204', 'd3351068-cafc-4906-96e8-4467a4f6f333', 'https://ctk-choir.beretesting.com/melody/Melody%20Or%20Soprano%20All%20Glory%20Praise%20And%20Honor%20CBW%2062.mp3', '2024-11-13 07:08:48.335281+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('68e6ba3b-c7d3-4f3b-87af-b4ed013ee782', 'b3b5cb24-dc57-406f-823e-ca4d26fcfb7b', 'https://ctk-choir.beretesting.com/melody/Melody%20For%20Child%20of%20the%20Poor%20G%26P%20336.mp3', '2024-11-13 07:11:13.673593+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('71466025-bed9-4fd8-899b-30966fba637b', '6de73862-1f98-4018-ab18-0902727d2e4a', 'https://ctk-choir.beretesting.com/melody/Melody%20Soprano%20Alleluia!%20Sing%20To%20Jesus%20CBW%20426.mp3', '2024-11-13 07:08:48.335281+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('7e4ce383-03c2-4898-9a1a-f50b0f67ec05', '3e6b0c61-b8db-4855-84b3-39e5c5265216', 'https://ctk-choir.beretesting.com/mass-parts/Great%20Amen.mp3', '2024-11-13 07:02:41.847944+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('8608459a-fcdb-4677-af8f-0b6aa1d8956e', '76cbbc78-e56e-4d26-b992-318017dd0e5a', 'https://ctk-choir.beretesting.com/mass-parts/Advent%20Chant%20Mass%20Cis%20P.%2074.mp3', '2024-11-30 19:47:27.97587+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('8ef6d5c8-b7e0-45e9-b7d2-353f16ba2587', '157c10c2-c964-481c-9009-67eb7a24ea42', 'https://ctk-choir.beretesting.com/mass-parts/Holy%20Holy%20Holy.mp3', '2024-11-13 07:02:41.847944+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('b14957d5-e777-47d1-9d6b-2a1dff6c36ee', '904fadc3-c7db-4a07-b72b-ea27eefa3e58', 'https://ctk-choir.beretesting.com/alto/Alto%20Crown%20Him%20with%20Many%20Crowns%20CBW%20437.mp3', '2024-11-13 04:22:53.197623+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('b2d37edb-6258-4c99-9c09-a79a936e02be', 'd3351068-cafc-4906-96e8-4467a4f6f333', 'https://ctk-choir.beretesting.com/alto/Alto%20All%20Glory%20Praise%20And%20Honor%20CBW%2062.mp3', '2024-11-13 04:22:53.197623+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('b7fbd6e9-b3bb-4d19-b4b2-1eec0f2f04c9', '7f60985c-265c-4ab3-b897-f714d025f498', 'https://ctk-choir.beretesting.com/melody/Soprano%20Or%20Melody%20For%20Mary%E2%80%99s%20Song%20G%26P%20436.mp3', '2024-11-13 07:08:48.335281+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('bc1ecd5c-7bde-438f-8129-ce9d4001e1c6', 'e5b11a4c-3f4a-4634-b9a5-e015cb2d1642', 'https://ctk-choir.beretesting.com/mass-parts/Glory%20To%20God.mp3', '2024-11-13 07:02:41.847944+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('ca44900e-a354-470b-b87f-dbc75463d323', 'fb9069bb-ed73-45b7-8570-baadfea22cb1', 'https://ctk-choir.beretesting.com/alto/Alto%20Dona%20Nobis%20Pacem%20CiS%206.2.mp3', '2024-11-13 04:22:53.197623+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('cb511f17-0512-4a95-a681-cb3a34805ac9', '904fadc3-c7db-4a07-b72b-ea27eefa3e58', 'https://ctk-choir.beretesting.com/melody/Melody%20Or%20Soprano%20Crown%20Him%20with%20Many%20Crowns%20CBW%20437.mp3', '2024-11-13 07:08:48.335281+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	
	('d0d45fc7-2e4e-4525-9072-56ac256b4ce7', 'f050ef17-2f85-4e32-9697-c84ea58c9679', 'https://ctk-choir.beretesting.com/melody/Melody%20Soprano%20For%20Praise%20My%20Soul%20the%20King%20Of%20Heaven%20CBW%20565.mp3', '2024-11-13 07:08:48.335281+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('dc11dbb5-4485-4dab-9315-598bffc18f04', 'f0eb523f-2b42-4bef-bff5-89a238aad00c', 'https://ctk-choir.beretesting.com/mass-parts/When%20We%20Eat%20This%20Bread.mp3', '2024-11-13 07:02:41.847944+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('e73a9c69-277f-4efd-abb0-3b5957df72c4', 'fb9069bb-ed73-45b7-8570-baadfea22cb1', 'https://ctk-choir.beretesting.com/melody/Melody%20Dona%20Nobis%20Pacem%20CiS%206.2.mp3', '2024-11-13 07:08:48.335281+00', 'db017ab5-3176-476a-9d24-33fee910eb48'),
	('a30e8b4c-8c2e-4821-8225-5905da88a937', '84ebd853-1990-4bd5-b366-12d5ab1fdc3f', 'https://ctk-choir.beretesting.com/melody/CBW%20317%20Prepare%20The%20Way.mp3', '2024-12-12 00:19:21.840632+00', '480a5a00-c068-4d4b-b56f-812bb84cc6ec'),
	('598ff7cb-df6f-42c3-a9ca-af1276b89f60', '8434a2b2-d1d3-4135-b704-28a0159a8c2d', 'https://ctk-choir.beretesting.com/melody/City%20If%20God%20CBW%20345.mp3', '2024-12-12 00:20:22.348606+00', '480a5a00-c068-4d4b-b56f-812bb84cc6ec'),
	('4a992972-dd38-45e0-a881-e32328ddd19a', 'c881273e-83ef-4235-83c7-0bc9e67e9f88', 'https://ctk-choir.beretesting.com/melody/For%20Dec%208%20There%20Is%20A%20Longing%20CiS%206.15.mp3', '2024-12-12 00:21:22.397534+00', '480a5a00-c068-4d4b-b56f-812bb84cc6ec'),
	('eccf6f97-0362-4c87-a616-641a6200ff20', 'af93c613-890c-4591-be9a-8e792e6cc4a5', 'https://ctk-choir.beretesting.com/melody/O%20Come%20O%20Come%20Emmanuel%20312%20CBW.mp3', '2024-12-12 00:28:34.740725+00', '480a5a00-c068-4d4b-b56f-812bb84cc6ec'),
	('da23a3c6-f8f5-4ae6-901e-bd5d8b4b299c', '049bd115-7b76-4309-a803-5bd54f7d92ed', 'https://ctk-choir.beretesting.com/melody/Maranatha%20295%20CBW.mp3', '2024-12-12 00:29:22.360635+00', '480a5a00-c068-4d4b-b56f-812bb84cc6ec'),
	('f613d1de-f922-4331-847a-8c93a23254a8', '2c8bf19e-261c-4a13-9da2-3b22de7337b0', 'https://ctk-choir.beretesting.com/melody/Practice%20Christmas%20Concert.mp3', '2024-12-12 00:34:57.083599+00', '480a5a00-c068-4d4b-b56f-812bb84cc6ec'),
	('8d8bb8f3-01fc-43e1-a99d-eee818f2ccee', '91d33f29-3508-44ef-9113-2cc4c58d1a90', 'https://ctk-choir.beretesting.com/alto/Alto%20The%20Angel%20Gabriel%20From%20Heaven%20Came%20316%20CBW.mp3', '2024-12-21 15:39:49.744909+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('db9f762c-c25e-424f-a2b3-ea8bcbbe6d7a', '502d5604-c587-4cb7-93fd-77cea04ee7f5', 'https://ctk-choir.beretesting.com/alto/Alto%20Immaculate%20Mary%20CBW%20463A.mp3', '2024-12-24 14:22:48.572124+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6'),
	('5ff2a8b7-1e7a-4c38-9c2b-a77813ffdccd', '0f1132ee-0cce-45b0-9958-89a50f4fb971', 'https://ctk-choir.beretesting.com/alto/Alto%20Silent%20Night%20GP%20312.mp3', '2024-12-24 14:24:33.353488+00', 'c94c9b3b-13b0-4b6a-907e-c3af34ce5df6');


--
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."schedules" ("id", "schedule_date", "created_at") VALUES
	('6af8ecb4-ed58-4655-b714-edddafcbdb06', '2024-11-24', '2024-11-12 21:11:08.834926+00'),
	('ec4da188-0ea4-4632-b2cb-a53380e2327d', '2024-12-16', '2024-11-12 21:11:29.815562+00'),
	('45ba8505-012e-4cae-8f13-8f391d40dcfb', '2024-12-01', '2024-11-30 19:37:11.259055+00'),
	('09e3ee25-f3a7-4256-bac1-19f994913353', '2024-12-08', '2024-12-12 00:09:24.626408+00'),
	('ee7d0fa5-5c2d-4e74-a1e6-16d38c9997a6', '2024-12-22', '2024-12-21 15:40:21.560002+00'),
	('1d1c077b-69ff-4b82-a827-716a6f4b6fd3', '2024-12-25', '2024-12-24 14:24:58.432167+00');


--
-- Data for Name: schedule_songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."schedule_songs" ("id", "schedule_id", "song_id", "created_at") VALUES
	('a1652442-dbc0-4e47-82d6-371fe082cdca', 'ec4da188-0ea4-4632-b2cb-a53380e2327d', '7f60985c-265c-4ab3-b897-f714d025f498', '2024-11-13 02:10:20.393642+00'),
	('8ed5255b-5eb3-4f53-922d-f6232a7537f8', '6af8ecb4-ed58-4655-b714-edddafcbdb06', '43b11101-698b-4109-8489-68431b0be1a3', '2024-11-13 02:10:20.393642+00'),
	('aa68974f-12d1-464d-8ceb-bd54f0b25ebe', '6af8ecb4-ed58-4655-b714-edddafcbdb06', '6de73862-1f98-4018-ab18-0902727d2e4a', '2024-11-13 02:10:20.393642+00'),
	('140f4d21-d7b5-4c6a-9673-adb73ae9d0dc', '6af8ecb4-ed58-4655-b714-edddafcbdb06', '7bd930d4-fe19-444d-80aa-4e4349267f1a', '2024-11-13 02:10:20.393642+00'),
	('6ea39dcd-98e1-48d0-a652-cda03f51c122', '6af8ecb4-ed58-4655-b714-edddafcbdb06', '904fadc3-c7db-4a07-b72b-ea27eefa3e58', '2024-11-13 02:10:20.393642+00'),
	('a338616f-ebec-4e71-a3f1-6a375d4c1459', '6af8ecb4-ed58-4655-b714-edddafcbdb06', 'cdea17c2-5c84-4ca9-b152-c41439c642db', '2024-11-13 02:10:20.393642+00'),
	('0e9db87e-b197-4ac2-beb4-a7fbb8c0d4e9', '6af8ecb4-ed58-4655-b714-edddafcbdb06', 'd3351068-cafc-4906-96e8-4467a4f6f333', '2024-11-13 02:10:20.393642+00'),
	('3c98f695-b4b1-42e7-8bea-190d07410e05', '6af8ecb4-ed58-4655-b714-edddafcbdb06', 'f050ef17-2f85-4e32-9697-c84ea58c9679', '2024-11-13 02:10:20.393642+00'),
	('16da84b1-fd26-40f2-b705-37f0d293e8e5', '6af8ecb4-ed58-4655-b714-edddafcbdb06', 'fb9069bb-ed73-45b7-8570-baadfea22cb1', '2024-11-13 02:10:20.393642+00'),
	('b09989e4-3e56-454e-bbc4-cf490fff3593', 'ec4da188-0ea4-4632-b2cb-a53380e2327d', 'b3b5cb24-dc57-406f-823e-ca4d26fcfb7b', '2024-11-13 06:57:08.505976+00'),
	('553dcc90-1825-481c-a9a1-d1bd73fe5ca4', '6af8ecb4-ed58-4655-b714-edddafcbdb06', 'bc991678-8bdc-4e18-bf6e-47c5538ab29f', '2024-11-20 14:42:10.628896+00'),
	('263626f8-b5e9-46b8-a986-e02cba43ac39', '6af8ecb4-ed58-4655-b714-edddafcbdb06', '157c10c2-c964-481c-9009-67eb7a24ea42', '2024-11-20 14:54:23.466125+00'),
	('d4da7bbb-c20c-41bf-a872-32bc3be77e7d', '6af8ecb4-ed58-4655-b714-edddafcbdb06', '3e6b0c61-b8db-4855-84b3-39e5c5265216', '2024-11-20 14:54:38.567178+00'),
	('04182e87-3895-4b2e-87d4-28487888eed6', '6af8ecb4-ed58-4655-b714-edddafcbdb06', '471e93f8-5b0b-4e63-a456-179ab126392f', '2024-11-20 14:54:55.306044+00'),
	('532c2d62-bf6d-47a5-ba78-ca31c3a5fb13', '6af8ecb4-ed58-4655-b714-edddafcbdb06', 'c12a3f54-a01a-492d-a25c-69defffa52f6', '2024-11-20 14:55:08.954094+00'),
	('cdab52d1-8e9f-4775-b232-72c8ddcc60b2', '6af8ecb4-ed58-4655-b714-edddafcbdb06', 'e5b11a4c-3f4a-4634-b9a5-e015cb2d1642', '2024-11-20 14:55:38.219982+00'),
	('17fb2c98-2c1e-4772-867a-3af5b0224230', '6af8ecb4-ed58-4655-b714-edddafcbdb06', 'f0eb523f-2b42-4bef-bff5-89a238aad00c', '2024-11-20 14:55:51.005534+00'),
	('6865829c-e23a-4054-814f-2b9d0c15b060', '45ba8505-012e-4cae-8f13-8f391d40dcfb', '9c2309f4-1b57-461a-b6dc-bc5c2a0c37f8', '2024-11-30 19:39:12.456786+00'),
	('747b137e-aea4-448d-ad5f-ca51224b66f6', '45ba8505-012e-4cae-8f13-8f391d40dcfb', '76cbbc78-e56e-4d26-b992-318017dd0e5a', '2024-12-12 00:23:36.188538+00'),
	('2c67098d-0bdc-418f-984c-d36ea8410f6f', '45ba8505-012e-4cae-8f13-8f391d40dcfb', '049bd115-7b76-4309-a803-5bd54f7d92ed', '2024-12-12 00:23:51.149976+00'),
	('950e22a6-0afe-44a4-8060-89cc6b09f060', '45ba8505-012e-4cae-8f13-8f391d40dcfb', 'af93c613-890c-4591-be9a-8e792e6cc4a5', '2024-12-12 00:24:15.638208+00'),
	('0e746ba3-7b19-4966-956f-41d7b0beaaa6', '45ba8505-012e-4cae-8f13-8f391d40dcfb', '84ebd853-1990-4bd5-b366-12d5ab1fdc3f', '2024-12-12 00:24:32.01089+00'),
	('c2ec5942-5064-4176-b64a-2add0cbacab2', '45ba8505-012e-4cae-8f13-8f391d40dcfb', '8434a2b2-d1d3-4135-b704-28a0159a8c2d', '2024-12-12 00:24:45.281407+00'),
	('6838bacc-0679-4d28-a2fa-9cb12dc309df', '09e3ee25-f3a7-4256-bac1-19f994913353', 'c881273e-83ef-4235-83c7-0bc9e67e9f88', '2024-12-12 00:30:19.980481+00'),
	('d12907eb-70c8-4a94-a2d6-4758e4509115', 'ec4da188-0ea4-4632-b2cb-a53380e2327d', '2c8bf19e-261c-4a13-9da2-3b22de7337b0', '2024-12-12 00:35:16.212804+00'),
	('866f60bf-ea73-4ec1-be8b-61048737bbd0', 'ee7d0fa5-5c2d-4e74-a1e6-16d38c9997a6', '91d33f29-3508-44ef-9113-2cc4c58d1a90', '2024-12-21 15:40:58.030331+00'),
	('af9dda57-4151-4893-a689-a200a23b31dd', 'ee7d0fa5-5c2d-4e74-a1e6-16d38c9997a6', '84ebd853-1990-4bd5-b366-12d5ab1fdc3f', '2024-12-21 15:41:33.098161+00'),
	('3ee6a862-930b-413c-9f62-7adf77c8e5ed', '1d1c077b-69ff-4b82-a827-716a6f4b6fd3', '0f1132ee-0cce-45b0-9958-89a50f4fb971', '2024-12-24 14:25:21.155855+00'),
	('0cca20a7-8866-4e6e-9425-3277382a226d', '1d1c077b-69ff-4b82-a827-716a6f4b6fd3', '502d5604-c587-4cb7-93fd-77cea04ee7f5', '2024-12-24 14:25:39.654874+00');


