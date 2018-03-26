const zapEmojisPerStrength = [1, 2, 3, 4, 7]
const emojiArray = {
  angry: ["steaming", "skullandbones", "angry", "stop", "under18", "bomb", "cursing"],
  happy: ["crazy", "surprised", "sunglasses", "muscle", "lol", "okay", "top"],
  sad: ["sad-sweat", "sad", "frowning", "confounded", "nervous", "crying", "disappointed"],
  sassy: ["love-cat", "smirk", "crazy", "love-eyes", "point-right", "okay", "kiss"],
  sick: ["sick", "nausea", "weary", "sneezing", "bandage", "vomiting", "thermometer"],
}
const strengthTitleArray = [
  "Zap força fraca",
  "Zap força média",
  "Isso que é zap bb",
  "Zap monstrão",
  "Zap topper d+"
]

const zapStrengthShow = value => {
  const mood = $(".mood-button.active").data("mood")
  const finalZap = `
    <div class="mb10">${strengthTitleArray[value]}</div>
    ${emojiArray[mood].slice(0, zapEmojisPerStrength[value]).map(
      emoji => `<img class="emoji" src="images/emojis/${emoji}.png" alt="${emoji}"/>`
    ).join(" ")}
  `

  $("#strength-show").html(finalZap)
}

$(window).on("load", () => {
  // Preload images
  $.fn.preload = function() {
    this.each(function(){
        $("<img/>")[0].src = this
    })
  }

  Object.values(emojiArray).forEach(arr => {
    $(arr.map(emoji => `images/emojis/${emoji}.png`)).preload()
  })
})

$(() => {
  $('[data-toggle="tooltip"]').tooltip()

  $("#strength-slider").on("input change", e => {
    zapStrengthShow(e.target.value)
  })

  $(".mood-button").on("click", function() {
    $(".mood-button").removeClass("active")
    $(this).addClass("active")
    zapStrengthShow($("#strength-slider").val())
  })

  $("#vemdezap").on("click", () => {
    const zap = $("#text-box").val() || "Zapeia esse texto bb que vai ficar top demais"
    const mood = $(".mood-button.active").data("mood")
    const strength = Number($("#strength-slider").val() + 1)

    $.post("/api/v1.0", { zap, mood, strength }, res => {
      console.log("Texto zapeado com sucesso:", res)
      $("#text-box").val(res.zap)

      $("#text-box").select()
      document.execCommand("copy")

      $("#text-box").attr({ "data-toggle": "tooltip", "title": "Zap copiado!" })
      $("#text-box").tooltip("show")
      setTimeout(() => $("#text-box").tooltip("hide"), 2000)
      setTimeout(() => $("#text-box").tooltip("dispose"), 2500)

      if (res.gemidao) {
        new Audio("audio/gemidao.mp3").play()
      }

      $("#zapshare button").removeClass("hidden")
    })
  })

  $("#zapshare").on("click", function() {
    this.href = `whatsapp://send?text=${encodeURI($("#text-box").val())}`
  })
})