function bugzilla(product, bugtrend, bugprio, top5_components){
  var colors = ['#B39DDB','#9FA8DA','#90CAF9','#81D4FA','#80DEEA','#80CBC4','#A5D6A7','#C5E1A5','#E6EE9C','#FFF59D','#FFE082','#FFCC80','#FFAB91','#BCAAA4','#EEEEEE'].reverse();
  // BugZilla
  new Morris.Line({
    element: 'bug_trend',
    data: bugtrend,
    xkey: 'time',
    ykeys: ['open', 'fixed'],
    yLabelFormat: function(y){return y != Math.round(y)?'':y;},
    labels: ['Open', 'Fixed'],
    resize: true,
    fillOpacity: 0.5,
    smooth: false,
    hideHover: true,
    lineColors: ["#42A5F5", "#D4E157"],
    hoverCallback: function (index, options, content, row) {
      return content;
    }
  }).on('click', function(i, row){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      jQuery.noop();
    else
      window.open("https://bugzilla.suse.com/buglist.cgi?product="+product+"&query_format=advanced&resolution=---");
  });
  new Morris.Bar({
    element: 'bug_prio',
    data: bugprio,
    xkey: 'bugprio',
    ykeys: ['p1', 'p2', 'p3', 'p4', 'p5'],
    labels: ['P1 - Urgent', 'P2 - High', 'P3 - Medium', 'P4 - Low', 'P5 - None'],
    resize: true,
    stacked: true,
    hideHover: true,
    barColors: colors,
    hoverCallback: function (index, options, content, row) {
      var ret = '';
      if (typeof row.p1 !== "undefined")
        return row.p1;
      else if (typeof row.p2 !== "undefined")
        return row.p2;
      else if (typeof row.p3 !== "undefined")
        return row.p3;
      else if (typeof row.p4 !== "undefined")
        return row.p4;
      else if (typeof row.p5 !== "undefined")
        return row.p5;
    }
  }).on('click', function(i, row){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      jQuery.noop();
    else
      window.open("https://bugzilla.suse.com/buglist.cgi?order=Importance&priority="+row.bugprio+"&product="+product+"&query_format=advanced&resolution=---");
  });
  new Morris.Donut({
    element: 'top_components',
    data: top5_components,
    colors: colors,
    resize: true,
    formatter: function(y, data){
      return y;
    }
  }).on('click', function(i, row){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      jQuery.noop();
    else
      window.open("https://bugzilla.suse.com/buglist.cgi?order=Importance&component="+row.label+"&product="+product+"&query_format=advanced&resolution=---");
  });
  $("[last_change_time]").each(function (index, value){
    var one_week = 604800;
    var two_weeks = 1209600;
    var one_month = 2629743;
    var now = Math.round((new Date()).getTime() / 1000);
    var then = $(this).attr("last_change_time");
    var diff = now - then;
    if (diff < one_week) {
      $(value).css("color","#212121").attr('title', 'last change < one week');
    } else if (diff < two_weeks) {
      $(value).css("color","#E57373").attr('title', 'last change < two weeks');
    } else if (diff < one_month) {
      $(value).css("color","#C62828").attr('title', 'last change < one month');
    } else {
      $(value).css("color","#D50000").attr('title', 'last change > one month');
    }
  });
}

