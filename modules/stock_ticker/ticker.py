from yahoo_fin import stock_info as si

print(round(si.get_live_price('KRFG'), 3))
print(round(si.get_live_price('AMD'), 3))
print(round(si.get_live_price('AMC'), 3))
print(round(si.get_live_price('MVIS'), 3))
print(round(si.get_live_price('NFLX'), 3))
print(round(si.get_live_price('NVDA'), 3))