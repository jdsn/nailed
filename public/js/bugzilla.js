function bugzilla(product, bugtrend, bugprio, top5_components, colors){
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
    lineColors: [ colors["line"]["red"],
                  colors["line"]["green"]
                ],
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
    barColors: [ colors["bar"]["red"],
                 colors["bar"]["orange"],
                 colors["bar"]["yellow"],
                 colors["bar"]["green"],
                 colors["bar"]["blue"]
               ],
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
    colors: [ colors["pie"]["red"],
              colors["pie"]["orange"],
              colors["pie"]["yellow"],
              colors["pie"]["green"],
              colors["pie"]["blue"]
            ],
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
}
