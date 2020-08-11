$(function(){
  // 날짜 변환 코드: moment 라이브러리로 대체 가능
  // 서버단에서 변환하지 않는 이유: 서버가 해외에 있는 경우 해당 지역의 시간대로 변경되는 문제 발생 
  function get2digits(num) {
    return ('0' + num).slice(-2);
  }

  function getDate(dateObj) {
    if(dateObj instanceof Date) {
      return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth());
    }
  }

  function getTime(dateObj) {
    if(dateObj instanceof Date) {
      return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes())+ ':' + get2digits(dateObj.getSeconds());
    }
  }

  function converDate() {
    $('[data-date]').each((index, item) => {
      const dateString = $(item).data('date');
      if(dateString) {
        const date = new Date(dateString);
        $(item).html(getDate(date));
      }
    });
  }

  function converDateTime() {
    $('[data-date-time]').each((index, item) => {
      const dateString = $(item).data('date-time');
      if(dateString) {
        const date = new Date(dateString);
        $(item).html(getDate(date)+' '+getTime(date));
      }
    });
  }

  converDate();
  converDateTime();
});