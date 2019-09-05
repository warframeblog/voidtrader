# Voidtrader

A lambda function that provides the current Void Trader Information which is shown on the 
following page https://warframeblog.com/baro-kiteer-void-trader/

## Application Flow

1. Invoke `GET https://api.warframestat.us/{platform}/voidTrader` to get the current Void Trader Information
1. Get the voidtrader post data
1. Update the post frontmatter