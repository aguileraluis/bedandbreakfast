if (!moment(moment(fromdate).format("YYYY-MM-DD")).isBetween(moment(booking.fromdate._i).format("YYYY-MM-DD"), moment(booking.todate._i).format("YYYY-MM-DD"))
&& !moment(moment(todate).format("YYYY-MM-DD")).isBetween(moment(booking.fromdate._i).format("YYYY-MM-DD"), moment(booking.todate._i).format("YYYY-MM-DD"))) 