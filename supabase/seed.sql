-- Insert sample songs
INSERT INTO songs (song_name, songbook_name, song_number) VALUES
('Alleluia Sing To Jesus', 'CBW', '426'),
('All Glory Praise and Honour', 'CBW', '62'),
('Dona Nobis Pacem', 'CiS', '6.2'),
('Mary''s Song', 'G&P', '436'),
('The King of Glory', 'G&P', '423'),
('Laudate Omnes Gentes', 'CBW', '570'),
('Praise My Soul, The King of Heaven', 'CBW', '565'),
('To Jesus Christ Our Sovereign King', 'CBW', '438'),
('Crown Him With Many Crowns', 'CBW', '437');

-- Insert sample recordings
INSERT INTO recordings (song_id, voice_part, url) VALUES
((SELECT id FROM songs WHERE song_name = 'Alleluia Sing To Jesus'), 'Alto', 'https://ctk-choir.beretesting.com/alto/Alto%20Alleluia%20Sing%20To%20Jesus%20CBW%20426.mp3'),
((SELECT id FROM songs WHERE song_name = 'All Glory Praise and Honour'), 'Alto', 'https://ctk-choir.beretesting.com/alto/Alto%20All%20Glory%20Praise%20And%20Honor%20CBW%2062.mp3'),
((SELECT id FROM songs WHERE song_name = 'Dona Nobis Pacem'), 'Alto', 'https://ctk-choir.beretesting.com/alto/Alto%20Dona%20Nobis%20Pacem%20CiS%206.2.mp3'),
((SELECT id FROM songs WHERE song_name = 'Mary''s Song'), 'Alto', 'https://ctk-choir.beretesting.com/alto/Alto%20Mary%E2%80%99s%20Song%20G%26P%20436.mp3'),
((SELECT id FROM songs WHERE song_name = 'The King of Glory'), 'Alto', 'https://ctk-choir.beretesting.com/alto/Alto%20The%20King%20Of%20Glory%20Glory%20And%20Praise%20423.mp3'),
((SELECT id FROM songs WHERE song_name = 'Laudate Omnes Gentes'), 'Alto', 'https://ctk-choir.beretesting.com/alto/Alto%20Laudate%20Omnes%20Gentes%20CBW%20570.mp3'),
((SELECT id FROM songs WHERE song_name = 'Praise My Soul, The King of Heaven'), 'Alto', 'https://ctk-choir.beretesting.com/alto/Alto%20Verse%202%20Praise%20My%20Soul%2C%20The%20King%20Of%20Heaven%20CBW%20565.mp3'),
((SELECT id FROM songs WHERE song_name = 'To Jesus Christ Our Sovereign King'), 'Alto', 'https://ctk-choir.beretesting.com/alto/Alto%20To%20Jesus%20Christ%20Our%20Sovereign%20King%20CBW%20438.mp3'),
((SELECT id FROM songs WHERE song_name = 'Crown Him With Many Crowns'), 'Alto', 'https://ctk-choir.beretesting.com/alto/Alto%20Crown%20Him%20with%20Many%20Crowns%20CBW%20437.mp3');

-- Insert sample schedules
INSERT INTO schedules (schedule_date) VALUES
('2024-11-24'),
('2024-12-16');

INSERT INTO schedule_songs (schedule_id, song_id) VALUES
((SELECT id FROM schedules WHERE schedule_date = '2024-11-24'), (SELECT id FROM songs WHERE song_name = 'All Glory Praise and Honour')),
((SELECT id FROM schedules WHERE schedule_date = '2024-11-24'), (SELECT id FROM songs WHERE song_name = 'Dona Nobis Pacem')),
((SELECT id FROM schedules WHERE schedule_date = '2024-11-24'), (SELECT id FROM songs WHERE song_name = 'The King of Glory')),
((SELECT id FROM schedules WHERE schedule_date = '2024-11-24'), (SELECT id FROM songs WHERE song_name = 'Laudate Omnes Gentes')),
((SELECT id FROM schedules WHERE schedule_date = '2024-11-24'), (SELECT id FROM songs WHERE song_name = 'Praise My Soul, The King of Heaven')),
((SELECT id FROM schedules WHERE schedule_date = '2024-11-24'), (SELECT id FROM songs WHERE song_name = 'Alleluia Sing To Jesus')),
((SELECT id FROM schedules WHERE schedule_date = '2024-11-24'), (SELECT id FROM songs WHERE song_name = 'To Jesus Christ Our Sovereign King')),
((SELECT id FROM schedules WHERE schedule_date = '2024-11-24'), (SELECT id FROM songs WHERE song_name = 'Crown Him With Many Crowns')),
((SELECT id FROM schedules WHERE schedule_date = '2024-12-16'), (SELECT id FROM songs WHERE song_name = 'Mary''s Song'));