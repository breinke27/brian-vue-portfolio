<script setup>
import banner from './Banner.vue';
</script>

<template>
  <div>
    <banner />
    <div class="flex flex-col items-center mt-20">
    </div> 
  </div>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Role: Data Engineer</h1>
    <h2 class="text-2xl font-semibold mb-2">Technologies Used:</h2>
    <ul class="list-disc list-inside mb-4">
      <li>Python</li>
      <li>Django</li>
    </ul>
    <p class="text-lg mb-4">
      As a data engineer, I was given the opportunity to test some of the statistical models built in a Django web app called dataBase. This exercise provided me with an introduction to web applications and more specifically the importance of testing statistical models within the apps themselves. This has led me down the path to build the web app you see here! As I continue to progress with building using Django I will be more hands-on with the creation of further statistical models and the overall functionality of the app.
    </p>
    <div class="border border-gray-300 p-6 rounded-lg w-full max-w-4xl mx-auto">
        <h3 class="text-xl font-semibold mb-2">Code:</h3>
        <pre class="text-sm bg-gray-100 p-4 rounded-lg text-blue-500 overflow-x-auto">
if typing.TYPE_CHECKING:
    pass

@pytest.mark.django_db
def test_calculate_pitch_count(pitches):
    last_pitch = Pitch.objects.filter(pitcher__id=2).last()
    assert last_pitch.pitch_count == 63

@pytest.mark.django_db
def test_start_new_at_bat(pitches):
    last_pitch = Pitch.objects.filter(pitcher__id=2).last()
    assert last_pitch.at_bat == 21

@pytest.mark.django_db
def test_calculate_count_ball_strike(pitches):
    last_pitch = Pitch.objects.filter(pitcher__id=2).last()
    assert last_pitch.ball_count == 2
    assert last_pitch.strike_count == 1

@pytest.mark.django_db
def test_calculate_ball_or_strike(pitches):
    last_pitch = Pitch.objects.filter(pitcher__id=2).last()
    assert last_pitch.ball_or_strike == "Strike"

@pytest.mark.django_db
def test_calculate_raw_strikes(pitches):
    last_pitch = Pitch.objects.filter(pitcher__id=2).last()
    assert last_pitch.raw_strike_counter == 1

@pytest.mark.django_db
def test_calculate_count(pitches):
    last_pitch = Pitch.objects.filter(pitcher__id=2).last()
    assert last_pitch.count == "2 - 0"
___________________________________________

import typing
import base64
import pytest

from database2.dataentry.models import Pitcher
from database2.schema.filters import (
    PitcherFilter,
)
from database2.schema.resolvers import (
    get_pitcher_stats,
)

if typing.TYPE_CHECKING:
    pass


"""FILTERS"""

# Not sure how to test the prefixed queries

@pytest.mark.django_db
def test_pitcher_filter_archived(pitchers):
    filter = PitcherFilter(archived=False)
    pitchers = filter.filter_archived(Pitcher.objects.all())

    assert len(pitchers) == 1
    assert pitchers[0].name == "Billy Bob"


"""RESOLVERS"""


@pytest.mark.django_db
def test_get_pitcher_stats(pitches):
    pitch = pitches[0][1]
    team_id = str(pitch.pitcher.team.id)
    # Encode the team_id in base64 format
    encoded_team_id = base64.b64encode(f"TeamType:{team_id}".encode()).decode()

    order_by = "total_innings"
    query = ""
    archived = False

    pitcher_stats = get_pitcher_stats(None, team_id=encoded_team_id, order_by=order_by, query=query, archived=archived)
    pitcher = pitcher_stats[0]
    assert pitcher.total_pitches == 63
    assert pitcher.total_innings == 4.0
    #assert pitcher.strikeouts == 3.0
    assert pitcher.top_fb_velo == 93.0
    assert pitcher.walks == 2.0
    assert pitcher.hits == 6.0
    assert pitcher.K_per_9 == 6.75
    assert pitcher.BB_per_9 == 4.5
    assert pitcher.WHIP == 2.0
    assert round(pitcher.strike_percentage, 2) == 0.59
    assert round(pitcher.whiff_percentage, 2) == 0.11
    assert round(pitcher.swing_percentage, 2) == 0.46
    ___________________________________________
  
  import typing


import pytest
from model_bakery import baker

from .dataentry.models import (
    Pitcher,
    Game,
    Pitch,
    MyTeam,
)

if typing.TYPE_CHECKING:  # pragma: no cover
    pass


@pytest.fixture
def pitchers(db):
    team = MyTeam.objects.create(name="testteam", password="testpassword")
    pitcher = Pitcher.objects.create(team=team, name="Billy Bob", handed="R", year="2021", archived=False)
    pitcher2 = Pitcher.objects.create(team=team, name="testpitcher2", handed="L", year="2020", archived=True)

    pitchers = [pitcher, pitcher2]
    return pitchers

@pytest.fixture
def games(db):
    team = MyTeam.objects.create(name="testteam", password="testpassword")
    game = Game.objects.create(team=team, opponent="Losers", date="2021-01-01",)
    game2 = Game.objects.create(team=team, opponent="testopponent2", date="2020-01-01",)

    games = [game, game2]
    return games

@pytest.fixture()
def pitches(db):
    myteam = baker.make(MyTeam, name="testteam", password="testpassword")
    pitcher = baker.make(Pitcher, pk=2, name="Tracy", team=myteam, archived=False)
    game = baker.make(Game)
    pitches = [
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=1, pitch_type="4S", velo=90.0,
                   result="K Swinging"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=2, pitch_type="4S", velo=89.2,
                   result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=3, pitch_type="CB", velo=78.0,
                   result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=4, pitch_type="4S", velo=90.0,
                   result="Foul Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=5, pitch_type="4S", velo=91.0,
                   result="Foul Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=6, pitch_type="SL", velo=82.0,
                   result="Strikeout Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=7, pitch_type="4S", velo=90.0,
                   result="K Swinging"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=8, pitch_type="4S", velo=90.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=9, pitch_type="4S", velo=90.0,
                   result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=10, pitch_type="4S", velo=90.0,
                   result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=11, pitch_type="4S", velo=90.0,
                   result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=12, pitch_type="4S", velo=90.0,
                   result="Walk"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=13, pitch_type="4S", velo=90.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=14, pitch_type="4S", velo=93.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=15, pitch_type="4S", velo=90.0,
                    result="Single"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=16, pitch_type="CH", velo=75.0,
                    result="BIP OUT"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=17, pitch_type="CH", velo=77.0,
                    result="BIP OUT"),
        ## Above is 1 IP     #Brian's Additions Start Here
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=18, pitch_type="SL", velo=82.0,
                    result="Foul Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=19, pitch_type="4S", velo=89.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=20, pitch_type="CH", velo=75.0,
                    result="Strikeout Swinging"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=21, pitch_type="CH", velo=77.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=22, pitch_type="CH", velo=79.0,
                    result="Single"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=23, pitch_type="SL", velo=82.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=24, pitch_type="4S", velo=91.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=25, pitch_type="SL", velo=80.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=26, pitch_type="SL", velo=81.0,
                    result="K Swinging"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=27, pitch_type="4S", velo=92.0,
                    result="BIP OUT"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=28, pitch_type="CH", velo=77.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=29, pitch_type="FB", velo=91.0,
                    result="Double"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=30, pitch_type="SL", velo=79.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=31, pitch_type="FB", velo=92.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=32, pitch_type="FB", velo=93.0,
                    result="BIP OUT"),
        ## Above is 1 IP
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=33, pitch_type="SL", velo=80.0,
                    result="K Swinging"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=34, pitch_type="FB", velo=92.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=35, pitch_type="SL", velo=82.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=36, pitch_type="FB", velo=92.0,
                    result="BIP OUT"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=37, pitch_type="SL", velo=81.0,
                    result="Single"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=38, pitch_type="FB", velo=92.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=39, pitch_type="FB", velo=90.0,
                    result="Foul Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=40, pitch_type="CH", velo=81.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=41, pitch_type="SL", velo=79.0,
                    result="Strikeout Swinging"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=42, pitch_type="FB", velo=92.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=43, pitch_type="CH", velo=78.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=44, pitch_type="FB", velo=92.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=45, pitch_type="FB", velo=91.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=46, pitch_type="FB", velo=90.0,
                    result="Walk"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=47, pitch_type="FB", velo=92.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=48, pitch_type="CH", velo=78.0,
                    result="K Swinging"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=49, pitch_type="FB", velo=92.0,
                    result="BIP Out"),
        ## Above is 1 IP
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=50, pitch_type="SL", velo=81.0,
                    result="BIP Out"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=51, pitch_type="FB", velo=92.0,
                    result="Single"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=52, pitch_type="FB", velo=90.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=53, pitch_type="CH", velo=78.0,
                    result="K Swinging"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=54, pitch_type="CH", velo=79.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=55, pitch_type="FB", velo=90.0,
                    result="Single"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=56, pitch_type="SL", velo=82.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=57, pitch_type="FB", velo=92.0,
                    result="BIP OUT"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=58, pitch_type="CH", velo=77.0,
                    result="K Looking"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=59, pitch_type="FB", velo=89.0,
                    result="Foul Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=60, pitch_type="FB", velo=89.0,
                    result="Double"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=61, pitch_type="FB", velo=90.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=62, pitch_type="FB", velo=92.0,
                    result="Ball"),
        baker.make(Pitch, pitcher=pitcher, game=game, pitch_count=63, pitch_type="CH", velo=78.0,
                    result="BIP OUT"),
        ## Above is 1 IP
    ]

    return pitches, myteam.pk
      </pre>
    </div>
  </div>
</template>
