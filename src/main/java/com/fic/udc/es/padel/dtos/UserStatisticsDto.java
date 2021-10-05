package com.fic.udc.es.padel.dtos;

public class UserStatisticsDto {
	
	private int gamesWinned;
	private int gamesLossed;
	private int amateurGamesPlayed;
	
	public UserStatisticsDto() {
		super();
	}

	public UserStatisticsDto(int gamesWinned, int gamesLossed, int amateurGamesPlayed) {
		super();
		this.gamesWinned = gamesWinned;
		this.gamesLossed = gamesLossed;
		this.amateurGamesPlayed = amateurGamesPlayed;
	}

	public int getGamesWinned() {
		return gamesWinned;
	}

	public void setGamesWinned(int gamesWinned) {
		this.gamesWinned = gamesWinned;
	}

	public int getGamesLossed() {
		return gamesLossed;
	}

	public void setGamesLossed(int gamesLossed) {
		this.gamesLossed = gamesLossed;
	}

	public int getAmateurGamesPlayed() {
		return amateurGamesPlayed;
	}

	public void setAmateurGamesPlayed(int amateurGamesPlayed) {
		this.amateurGamesPlayed = amateurGamesPlayed;
	}
	

}
