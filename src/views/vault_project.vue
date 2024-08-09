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
      <h1 class="text-3xl font-bold mb-4">Data Scientist</h1>
      <h2 class="text-2xl font-semibold mb-2">Technologies Used:</h2>
      <ul class="list-disc list-inside mb-4">
        <li>R</li>
        <li>SQL</li>
      </ul>
      <p class="text-lg mb-4">
        During my time as a data scientist with Vaulted, I was given the opportunity to help create and validate the accuracy of machine learning models. The models that we built were used for creating expected player and team statistics. Along with aiding in the building of these machine learning models using XGBoost, I was able to test their accuracy and reliability using statistical analysis in R for both MLB (American Professional) and NPB (Japanese Professional) data. Below you will see the testing of the swing decision and the ball in play outcome models. Also, attached are SQL querys I was tasked with creating to identify different key player statistics.
      </p>
      <div class="border border-gray-300 p-4 rounded">
        <h3 class="text-xl font-semibold mb-2">Code:</h3>
        <pre class="text-sm bg-gray-100 p-2 rounded">
```
#Brian Reinke NPB SD Validation

#Import Packages 
library(tidyverse)
library(lubridate)
library(stringr)
library(DBI)
library(lme4)
library(RODBC)
library(ggplot2)
library(cowplot)
library(RPostgres)
library(RPostgreSQL)
library(tidymodels)
library(caret)
library(vip)
library(dplyr)
options(dplyr.summarise.inform = FALSE)
library(vaulted)

con <- vaulted_connect()

df <- dbGetQuery(con, "
select 
batter_id,
count(*) as n,
year,
pa,
k_rate,
bb_rate,
woba,
miss,
chase,
zone,
decision as the_ted,
swing_decision_rv as decision_value
from  npb.npb_batter_meta
group by batter_id, year, pa, k_rate, bb_rate, woba, miss, chase, zone
")

# Filter Out Nulls
df <- df %>%
  filter(if_any(c(k_rate, bb_rate, woba, miss, chase, zone), ~ !is.na(.)))

# Create YOY
df_yoy <- df %>%
  mutate(year = year + 1) %>%
  inner_join(df, by = c("batter_id", "year")) %>%
  mutate(tot_pa = pa.x + pa.y)

# the_ted + decision_value Cor and RMSE for zone, chase, k_rate, bb_rate, and woba
arm::display(lm(the_ted.y ~ the_ted.x, df_yoy, weights = tot_pa)) #0.26
arm::display(lm(decision_value.y ~ decision_value.x, df_yoy, weights = tot_pa)) #0.36
arm::display(lm(zone.y ~ zone.x, df_yoy, weights = tot_pa)) #0.43
arm::display(lm(chase.y ~ chase.x , df_yoy, weights = tot_pa)) #0.43
arm::display(lm(k_rate.y ~ k_rate.x, df_yoy, weights = tot_pa)) #0.33
arm::display(lm(bb_rate.y ~ bb_rate.x, df_yoy, weights = tot_pa)) #0.30
arm::display(lm(woba.y ~ woba.x, df_yoy, weights = tot_pa)) #0.21


Metrics::rmse(df_yoy$the_ted.y, df_yoy$the_ted.x) #0.07
Metrics::rmse(df_yoy$decision_value.y, df_yoy$decision_value.x) #1.86
Metrics::rmse(df_yoy$zone.y, df_yoy$zone.x) #0.10
Metrics::rmse(df_yoy$chase.y, df_yoy$chase.x) #0.11
Metrics::rmse(df_yoy$k_rate.y, df_yoy$k_rate.x) #0.01
Metrics::rmse(df_yoy$bb_rate.y, df_yoy$bb_rate.x) #0.07
Metrics::rmse(df_yoy$woba.y, df_yoy$woba.x) #.10

#Create Models 

#Model 1 (k_rate, bb_rate, the_ted, decision_value, chase)
arm::display(lm(woba ~ the_ted + decision_value+ k_rate + bb_rate + zone + chase, df, weights = pa)) # 0.42

#Model 2 (the_ted, zone, chase)
arm::display(lm(woba ~ the_ted + zone + chase, df, weights = pa)) # 0.20
#Care most about coef's here ^

#Individual LM's
arm::display(lm(woba ~ the_ted, df, weights = pa)) # 0.16
arm::display(lm(woba ~ chase, df, weights = pa)) # 0.12
arm::display(lm(woba ~ zone, df, weights = pa)) # 0.01
arm::display(lm(woba ~ k_rate, df, weights = pa)) # 0.06
arm::display(lm(woba ~ bb_rate, df, weights = pa)) # 0.31

# Swing decision highest cor to WOBA other than BB 


#Creation of Deltas df 

delta_df <- df_yoy %>%
  mutate(
    delta_decision = the_ted.y - the_ted.x,
    delta_dv = decision_value.y - decision_value.x,
    delta_chase = chase.y - chase.x,
    delta_zone = zone.y - zone.x,
    delta_k = k_rate.y - k_rate.x,
    delta_bb = bb_rate.y - bb_rate.x,
    delta_woba = woba.y - woba.x,
  )

#Multiple Regression Model
arm::display(lm(delta_woba ~ delta_decision + delta_dv + delta_k + delta_bb + delta_zone + delta_chase, delta_df, weights = tot_pa))

#LM
arm::display(lm(delta_woba ~ delta_decision + delta_zone + delta_chase, delta_df, weights = tot_pa))
# the_ted has the highest coefficient and therefore is the best determinant of wOBA

#Individual LM's to delta_woba
arm::display(lm(delta_woba ~ delta_decision, delta_df, weights = tot_pa)) # 0.05
arm::display(lm(delta_woba ~ delta_dv, delta_df, weights = tot_pa)) # 0.01
arm::display(lm(delta_woba ~ delta_chase, delta_df, weights = tot_pa)) # 0.10
arm::display(lm(delta_woba ~ delta_k, delta_df, weights = tot_pa)) # 0.18
arm::display(lm(delta_woba ~ delta_bb, delta_df, weights = tot_pa)) # 0.15

#Look through NPB swing decision leaders next to other performance metrics to ensure the leaders make baseball sense
df2 <- dbGetQuery(con, "select player_id as batter_id,
                 avg,
                 slg,
                 obp, 
                 ops
                from npb.npb_basic_batting_stats ")
merged_df <- merge(df, df2, by = "batter_id", all.x = TRUE)

#Expected Metrics Leader board and BIP metrics

merged_df <- merged_df %>%
  group_by(batter_id, year) %>%
  summarise(
    bip = pa,
    the_ted = mean(the_ted, na.rm = TRUE),
    decision_value = mean(decision_value, na.rm = TRUE),
    ba = mean(avg, na.rm = TRUE),
    slg = mean(slg, na.rm = TRUE),
    obp = mean(obp, na.rm = TRUE),
    ops = mean(ops,  na.rm = TRUE),
    woba = mean(woba, na.rm = TRUE)
  ) %>%
  filter(bip >= 25)

leaderboard <- merged_df %>%
  group_by(batter_id) %>%
  summarise(
    the_ted = the_ted,
    decision_value = decision_value,
    ba = ba,
    slg = slg,
    obp = obp, 
    ops = ops,
    woba = woba
  ) %>%
  distinct() %>%
  arrange(desc(ba))

print(leaderboard, n = 50)
_______________________________

#npbBIP checks - Brian Reinke 

#Uploading data
file_path <- ("/Users/brianreinke27/Desktop/npbBIP.csv")
npbBIP <- read.csv(file_path)
head(npbBIP)

#remotes::install_github("tidymodels/probably")

#library(tidymodels)
#library(probably) 

#Creating Calibration Plots 
#FOLLOWING LINK 
#remotes::install_github("tidymodels/probably")

#library(tidymodels)
#library(probably) 
#END OF FOLLOWING LINK 
names(npbBIP)

#install.packages("rms")
library(rms)

variables <- c("single_prob", "double_prob", "triple_prob", "homerun_prob", "xslg")

par(mfrow = c(2, 3), mar = c(4, 4, 2, 1))

for (variable in variables) {
  cat("Variable:", variable, "\n")
  
  # Create a data frame with the predicted probabilities and observed outcomes
  calibration_data <- data.frame(
    predicted_probs = npbBIP$bip_pred, 
    observed_outcomes = npbBIP[[variable]]
  )
  
  calibration_plot <- calibrate(calibration_data$predicted_probs, calibration_data$observed_outcomes)
  
  plot(calibration_plot, main = paste("Calibration Plot: ", variable), xlab = "Predicted Probability", ylab = "Observed Probability")
  
  abline(0, 1, col = "red", lty = 2)
  
  legend("topright", legend = c("Observed", "45-Degree Line"), col = c("blue", "red"), lty = 1:2, cex = 0.8)
}

par(mfrow = c(1, 1))


#Linear Modeling 
EVlm <- lm(xslg~exit_speed, data = npbBIP)
EVlm
summary(EVlm)

plot(npbBIP$exit_speed, npbBIP$xslg, main = "Linear Regression: exit_speed vs xslg",
     xlab = "xslg (Expected Slugging Percentage)", ylab = "exit_speed")
abline(EVlm, col = "red")
```
        </pre>
  <pre> 
    -- 1 
select
    batter_id,
    statcast.date,
    game_id,
    dense_rank() over (partition by statcast.year, batter_id order by statcast.date, at_bat_number) as pa_number_of_year,
    dense_rank() over (partition by game_id order by at_bat_number) pa_number_of_game,
    pa_result 
from
    analysis.mlb_statcast_pitches statcast
where
    batter_id = 660271
and 
	pa_result is not null
and 
	statcast.year = '2023'
group by
	batter_id, statcast.date, game_id, pa_result, pitch_result, statcast.year, at_bat_number
order by
    statcast.date, pa_number_of_game;

-- 2
-- Single Pitcher 
with PitchUsage as (
    select
        pitcher_id,
        year,
        batter_side,
        pitch_type,
        count(*) as num_pitches,
        ROUND(count(*) * 1.0 / (select count(*) from analysis.mlb_statcast_pitches where pitcher_id = 543037 and batter_side = 'R' and year = 2023), 3) as pitch_usage
    from
        analysis.mlb_statcast_pitches
    where
        pitcher_id = 543037
        and batter_side = 'R'
        and year = 2023
    group by
        pitcher_id, year, batter_side, pitch_type
)
select
    pitcher_id,
    year,
    batter_side,
    pitch_type,
    num_pitches,
    pitch_usage
from
    PitchUsage
order by
    pitch_type;
--Multiple Pitchers
--select distinct pitcher_id
--from analysis.mlb_statcast_pitches
--where year = 2022
with PitchUsage as (
    select
        pitcher_id,
        year,
        batter_side,
        pitch_type,
        count(*) as num_pitches,
        ROUND(count(*) * 1.0 / nullif(sum(count(*)) over (partition by pitcher_id, batter_side, year), 0), 3) as pitch_usage
    from
        analysis.mlb_statcast_pitches
    where
        (pitcher_id in (613534, 543037)) 
        and (batter_side in ('R', 'L')) 
        and year in (2023, 2022) 
    group by
        pitcher_id, year, batter_side, pitch_type
)

select
    pitcher_id,
    year,
    batter_side,
    pitch_type,
    num_pitches,
    pitch_usage
from
    PitchUsage
order by
    pitcher_id, year, batter_side, pitch_type;

-- Matthews Answer 
SELECT
	stat.pitcher_id,
	stat.year,
	stat.batter_side,
	stat.pitch_type,
	round(COUNT(*) * 1.0 / tot_pitches, 3) AS usage
FROM
	analysis.mlb_statcast_pitches stat
		inner join (
			select pitcher_id
				,year
				,batter_side
				,count(*) as tot_pitches
			from analysis.mlb_statcast_pitches
			group by pitcher_id
				,year
				,batter_side
		) tots on tots.pitcher_id = stat.pitcher_id
			and tots.year = stat.year
			and tots.batter_side = stat.batter_side
WHERE
	(stat.pitcher_id IN (613534, 543037)) 
	AND stat.year IN (2023, 2022) 
GROUP BY
	stat.pitcher_id, stat.year, stat.batter_side, stat.pitch_type, tots.tot_pitches
ORDER BY
    stat.pitcher_id, stat.year, stat.batter_side, stat.pitch_type;
	
-- 3 R and Python DONE

-- 4 
with RankedBIP as (
    select
        bip.trackman_id,
        statcast.home_team,
        bip.homerun_prob,
        dense_rank() over (partition by statcast.home_team order by bip.homerun_prob desc) as hr_rank
    from
        analysis.mlb_bip_predictions bip
    inner join
        analysis.mlb_statcast_pitches statcast on statcast.trackman_id = bip.trackman_id
    where
		statcast.year = 2023
	and 
		bip.homerun_prob is not null
)

select
    home_team,
    max(case when hr_rank = 1 then homerun_prob end) as highest_hr_probability,
    max(case when hr_rank = 2 then homerun_prob end) as second_highest_hr_probability,
    max(case when hr_rank = 3 then homerun_prob end) as third_highest_hr_probability,
    max(case when hr_rank = 4 then homerun_prob end) as fourth_highest_hr_probability,
    max(case when hr_rank = 5 then homerun_prob end) as fifth_highest_hr_probability,
    ROUND(avg(homerun_prob::NUMERIC), 2) as avg_hr_probability
from
    RankedBIP
group by
    home_team
order by
    avg_hr_probability desc;
	
-- 5
with SwingMissProbability as (
    select
        statcast.trackman_id,
        pq.swing_prob * pq.miss_prob as swing_miss_probability,
        statcast.pitch_type,
        statcast.rel_speed,
        statcast.pitcher_throws,
		statcast.balls,
		statcast.strikes,
		statcast.pitcher_id,
		statcast.date
    from analysis.mlb_statcast_pitches statcast
    join analysis.mlb_pq pq on statcast.trackman_id = pq.trackman_id
    where statcast.year = 2023 and statcast.pitch_type = 'SL'
)
select
    trackman_id,
    pitch_type,
    rel_speed,
    statcast.pitcher_throws,
	swing_miss_probability,
	pitcher.pitcher,
	statcast.pitcher_id,
	statcast.date
from SwingMissProbability statcast
inner join 
	analysis.mlb_eligible_pitchers pitcher on pitcher.pitcher_id = statcast.pitcher_id
order by swing_miss_probability desc
limit 100;

-- Query 1
with SwingMissProbability as (
    select
        statcast.trackman_id,
        pq.swing_prob * pq.miss_prob as swing_miss_probability,
        statcast.pitch_type,
        statcast.rel_speed,
        statcast.pitcher_throws
    from analysis.mlb_statcast_pitches statcast
    join analysis.mlb_pq pq on statcast.trackman_id = pq.trackman_id
    where statcast.year = 2023 and statcast.pitch_type = 'SL'
	order by 
		swing_miss_probability desc
	Limit 100
)
select
    pitcher_throws as handedness,
    avg(rel_speed) as avg_velocity
from SwingMissProbability
group by pitcher_throws
order by avg(rel_speed) desc

-- Query 2
with SwingMissProbability as (
    select
        statcast.trackman_id,
        pq.swing_prob * pq.miss_prob as swing_miss_probability,
        statcast.pitch_type,
        statcast.rel_speed,
        statcast.pitcher_throws,
        statcast.balls,
        statcast.strikes
    from analysis.mlb_statcast_pitches statcast
    join analysis.mlb_pq pq on statcast.trackman_id = pq.trackman_id
    where statcast.year = 2023 and statcast.pitch_type = 'SL'
	order by 
		swing_miss_probability desc
	limit 100
)
select
    count(*) as total_pitches,
    balls,
    strikes
from SwingMissProbability
group by balls, strikes
order by 
	total_pitches desc  
  </pre>
      </div>
    </div>
  </template>