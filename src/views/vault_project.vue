<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Data Scientist</h1>
      <h2 class="text-2xl font-semibold mb-2">Technologies Used:</h2>
      <ul class="list-disc list-inside mb-4">
        <li>R</li>
        <li>SQL</li>
      </ul>
      <p class="text-lg mb-4">
        This role utilizes a combination of modern technologies to create a robust and efficient solution. 
      </p>
      <div class="border border-gray-300 p-4 rounded">
        <h3 class="text-xl font-semibold mb-2">Code:</h3>
        <pre class="text-sm bg-gray-100 p-2 rounded">
````
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
````
        </pre>
      </div>
    </div>
  </template>